import * as SyncBackend from '@livestore/sync-cf/cf-worker'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createAuth } from './auth'
import type { Env } from './env'

// Re-export the Durable Object class
export { SyncBackendDO } from './sync-backend'

const app = new Hono<{ Bindings: Env }>()

// CORS for development
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8787'],
    credentials: true,
  })
)

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', service: 'livestore-app-server' })
})

// Better-auth routes
app.on(['GET', 'POST'], '/api/auth/*', async (c) => {
  const auth = createAuth(c.env)
  return auth.handler(c.req.raw)
})

// LiveStore sync endpoint
app.all('/sync', async (c) => {
  const searchParams = SyncBackend.matchSyncRequest(c.req.raw)

  if (searchParams === undefined) {
    return c.json({ error: 'Invalid sync request' }, 400)
  }

  // Optional: Validate auth token from syncPayload
  // const auth = createAuth(c.env)
  // const session = await auth.api.getSession({ headers: c.req.raw.headers })
  // if (!session) {
  //   return c.json({ error: 'Unauthorized' }, 401)
  // }

  return SyncBackend.handleSyncRequest({
    request: c.req.raw,
    searchParams,
    ctx: c.executionCtx,
    syncBackendBinding: 'SYNC_BACKEND_DO',
    headers: {},
  })
})

export default app
