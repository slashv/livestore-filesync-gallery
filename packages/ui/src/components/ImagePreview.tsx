import { useEffect } from 'react'
import { FileSyncImage } from './FileSyncImage'

export interface ImagePreviewProps {
  fileId: string
  alt?: string
  onClose: () => void
}

export function ImagePreview({ fileId, alt, onClose }: ImagePreviewProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: escape key handled via useEffect
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      data-testid="image-preview-backdrop"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: just preventing propagation */}
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <FileSyncImage
          fileId={fileId}
          size="full"
          fillMode="contain"
          className="max-w-[90vw] max-h-[90vh] object-contain"
          alt={alt}
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          data-testid="image-preview-close"
          aria-label="Close preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
