import * as SyncBackend from '@livestore/sync-cf/cf-worker'

// LiveStore Sync Backend Durable Object
// Handles WebSocket connections and event synchronization
export class SyncBackendDO extends SyncBackend.makeDurableObject({
  // Optional: Add logging for debugging
  // onPush: async (message, { storeId }) => {
  //   console.log(`[Sync] Push to store ${storeId}:`, message.batch.length, 'events')
  // },
  // onPull: async (message, { storeId }) => {
  //   console.log(`[Sync] Pull from store ${storeId}`)
  // },
}) {}
