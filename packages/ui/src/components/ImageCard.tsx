import { deleteFile } from '@livestore-filesync/core'
import type { Store } from '@livestore/livestore'
import { queryDb } from '@livestore/livestore'
import type { ReactApi } from '@livestore/react'
import { type schema, tables } from '@repo/schema'
import { useEffect, useState } from 'react'
import { FileSyncImage } from './FileSyncImage'
import { ImageDebugInfo } from './ImageDebugInfo'

type Image = typeof tables.images.rowSchema.Type
type AppStore = Store<typeof schema> & ReactApi

export interface ImageCardProps {
  image: Image
  store: AppStore
  onDelete: () => void
  onUpdateTitle: (title: string) => void
  /** Whether to enable thumbnail resolution (default: true) */
  enableThumbnails?: boolean
}

export function ImageCard({
  image,
  store,
  onDelete,
  onUpdateTitle,
  enableThumbnails = true,
}: ImageCardProps) {
  const file = store.useQuery(
    queryDb(tables.files.where({ id: image.fileId }).first(), { label: 'gallery-files' })
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(image.title)

  // Update edit title when image title changes (sync from other clients)
  useEffect(() => {
    setEditTitle(image.title)
  }, [image.title])

  if (!file) return null

  const handleDelete = async () => {
    onDelete()
    await deleteFile(file.id)
  }

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle.trim() !== image.title) {
      onUpdateTitle(editTitle.trim())
    }
    setIsEditing(false)
  }

  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow"
      data-testid={`image-card-${image.id}`}
    >
      <div className="relative bg-gray-100 aspect-square">
        <FileSyncImage
          fileId={file.id}
          store={store}
          size={enableThumbnails ? 'small' : 'full'}
          className="object-cover w-full h-full"
          alt={image.title}
        >
          {({ canDisplay, isUploading, isDownloading, isUsingThumbnail }) => (
            <>
              {/* Image type indicator (thumbnail vs original) */}
              {canDisplay && (
                <div
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium text-white ${
                    isUsingThumbnail ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                  data-testid={`image-type-${image.id}`}
                >
                  {isUsingThumbnail ? 'Thumbnail' : 'Original'}
                </div>
              )}

              {/* Sync status overlay */}
              {canDisplay && (isUploading || isDownloading) && (
                <div
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium text-white flex items-center gap-1 ${
                    isUploading ? 'bg-rose-500' : 'bg-blue-500'
                  }`}
                  data-testid={`sync-status-${image.id}`}
                >
                  <div className="w-3 h-3 rounded-full border-2 border-white animate-spin border-t-transparent" />
                  {isUploading ? 'Uploading' : 'Downloading'}
                </div>
              )}
            </>
          )}
        </FileSyncImage>
      </div>

      <div className="p-3">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit()
              if (e.key === 'Escape') {
                setEditTitle(image.title)
                setIsEditing(false)
              }
            }}
            className="px-2 py-1 w-full rounded border focus:outline-none focus:border-rose-400"
            // biome-ignore lint/a11y/noAutofocus: auto focus is intentional for inline editing
            autoFocus
            data-testid={`title-input-${image.id}`}
          />
        ) : (
          <button
            type="button"
            className="w-full font-medium text-left text-gray-700 truncate cursor-pointer hover:text-rose-600"
            onClick={() => setIsEditing(true)}
            title="Click to edit"
            data-testid={`title-${image.id}`}
          >
            {image.title}
          </button>
        )}

        <button
          type="button"
          onClick={handleDelete}
          className="mt-2 text-sm text-gray-400 transition-colors hover:text-red-500"
          data-testid={`delete-button-${image.id}`}
        >
          Delete
        </button>

        <ImageDebugInfo fileId={file.id} store={store} />
      </div>
    </div>
  )
}
