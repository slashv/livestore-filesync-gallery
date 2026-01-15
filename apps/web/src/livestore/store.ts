import { makePersistedAdapter } from '@livestore/adapter-web'
import LiveStoreSharedWorker from '@livestore/adapter-web/shared-worker?sharedworker'
import { useStore } from '@livestore/react'
import { makeWsSync } from '@livestore/sync-cf/client'
import { SyncPayload, schema } from '@repo/schema'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'
import LiveStoreWorker from './worker?worker'

// Sync backend URL
const syncUrl = import.meta.env.VITE_LIVESTORE_SYNC_URL ?? 'http://localhost:8787/sync'

const adapter = makePersistedAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
  sync: { backend: makeWsSync({ url: syncUrl }) },
})

// Accept userId as parameter - each user gets their own store
export function useAppStore(userId: string) {
  return useStore({
    storeId: userId,
    schema,
    adapter,
    batchUpdates,
    syncPayloadSchema: SyncPayload,
    syncPayload: { authToken: userId },
  })
}
