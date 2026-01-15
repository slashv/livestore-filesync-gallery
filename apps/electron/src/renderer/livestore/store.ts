import { makePersistedAdapter } from '@livestore/adapter-web'
import { useStore } from '@livestore/react'
import { SyncPayload, schema } from '@repo/schema'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'
import LiveStoreWorker from './worker?worker'

// Generate or retrieve a stable store ID for this Electron instance
function getStoreId(): string {
  const key = 'livestore-store-id'
  let storeId = localStorage.getItem(key)
  if (!storeId) {
    storeId = `electron-${crypto.randomUUID()}`
    localStorage.setItem(key, storeId)
  }
  return storeId
}

const storeId = getStoreId()

const adapter = makePersistedAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  // No SharedWorker in Electron - single window model
})

export function useAppStore() {
  return useStore({
    storeId,
    schema,
    adapter,
    batchUpdates,
    syncPayloadSchema: SyncPayload,
    syncPayload: { authToken: 'insecure-token-change-me' },
  })
}
