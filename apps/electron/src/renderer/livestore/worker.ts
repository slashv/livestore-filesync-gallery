import { makeWorker } from '@livestore/adapter-web/worker'
import { makeWsSync } from '@livestore/sync-cf/client'
import { schema } from '@repo/schema'

// In Electron, connect to the sync server
const syncUrl = 'http://localhost:8787/sync'

makeWorker({
  schema,
  sync: {
    backend: makeWsSync({ url: syncUrl }),
    initialSyncOptions: { _tag: 'Blocking', timeout: 5000 },
  },
})
