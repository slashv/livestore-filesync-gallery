import type { D1Database, DurableObjectNamespace, R2Bucket } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database
  SYNC_BACKEND_DO: DurableObjectNamespace
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  FILE_BUCKET: R2Bucket
  FILE_SIGNING_SECRET: string
}
