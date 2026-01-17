import type { Store } from '@livestore/livestore'
import { events, type schema } from '@repo/schema'

type AppStore = Store<typeof schema>

export function createGalleryActions(store: AppStore) {
  return {
    createImage: (id: string, title: string, fileId: string) => {
      store.commit(events.imageCreated({ id, title, fileId, createdAt: new Date() }))
    },
    updateTitle: (id: string, title: string) => {
      store.commit(events.imageTitleUpdated({ id, title }))
    },
    deleteImage: (id: string) => {
      store.commit(events.imageDeleted({ id, deletedAt: new Date() }))
    },
  }
}
