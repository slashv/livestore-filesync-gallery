import { initFileSync } from '@livestore-filesync/core'
import { createImagePreprocessor } from '@livestore-filesync/image/preprocessor'
import { initThumbnails } from '@livestore-filesync/image/thumbnails'
import { layer as opfsLayer } from '@livestore-filesync/opfs'
import { type ReactNode, useEffect, useState } from 'react'
import { useAppStore } from '~/livestore/store'

interface FileSyncProviderProps {
  userId: string
  children: ReactNode
}

export function FileSyncProvider({ userId, children }: FileSyncProviderProps) {
  const store = useAppStore(userId)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Initialize file sync with image preprocessing
    const disposeFileSync = initFileSync(store, {
      fileSystem: opfsLayer(),
      remote: {
        signerBaseUrl: '/api',
      },
      options: {
        preprocessors: {
          'image/*': createImagePreprocessor({
            maxDimension: 1500,
            quality: 85,
            format: 'jpeg',
          }),
        },
      },
    })

    // Initialize thumbnail generation
    const disposeThumbnails = initThumbnails(store, {
      sizes: { small: 200, medium: 400 },
      format: 'webp',
      fileSystem: opfsLayer(),
      workerUrl: new URL('../workers/thumbnail.worker.ts', import.meta.url),
    })

    setReady(true)

    return () => {
      void disposeFileSync()
      void disposeThumbnails()
    }
  }, [store])

  if (!ready) {
    return <div className="flex items-center justify-center h-screen text-gray-400">Loading...</div>
  }

  return <>{children}</>
}
