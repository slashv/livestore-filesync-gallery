import { makePersistedAdapter } from '@livestore/adapter-expo'
import { nanoid } from '@livestore/livestore'
import { useStore } from '@livestore/react'
import { makeWsSync } from '@livestore/sync-cf/client'
import { events, SyncPayload, schema, tables } from '@repo/schema'
import Constants from 'expo-constants'
import { unstable_batchedUpdates as batchUpdates } from 'react-native'

// Get sync URL from Expo constants or use default
const expoConfig = Constants.expoConfig?.extra ?? {}
const syncUrl = (expoConfig.LIVESTORE_SYNC_URL as string) ?? 'http://localhost:8787/sync'

const adapter = makePersistedAdapter({
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
    boot: (store) => {
      // Seed with a sample todo if empty
      if (store.query(tables.todos.count()) === 0) {
        store.commit(events.todoCreated({ id: nanoid(), text: 'Welcome to LiveStore!' }))
      }
    },
  })
}
