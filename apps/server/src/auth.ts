import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { expo } from '@better-auth/expo'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
import type { Env } from './env'

export function createAuth(env: Env) {
  const db = drizzle(env.DB, { schema })

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
    },
    plugins: [expo()],
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    trustedOrigins: ['*'],
  })
}

// Seed test users function
export async function seedTestUsers(auth: ReturnType<typeof createAuth>) {
  const testUsers = [
    { email: 'test1@example.com', password: 'password', name: 'Test User 1' },
    { email: 'test2@example.com', password: 'password', name: 'Test User 2' },
  ]

  const results: string[] = []

  for (const user of testUsers) {
    try {
      await auth.api.signUpEmail({
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
      })
      results.push(`Created user: ${user.email}`)
    } catch (error) {
      // User likely already exists
      results.push(`User exists or error: ${user.email}`)
    }
  }

  return results
}

export type Auth = ReturnType<typeof createAuth>
