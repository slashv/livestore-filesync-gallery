import { createAuthClient } from 'better-auth/react'
import { expoClient } from '@better-auth/expo/client'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

const expoConfig = Constants.expoConfig?.extra ?? {}
const baseURL = (expoConfig.API_URL as string) ?? 'http://localhost:8787'

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: 'livestore-todo',
      storagePrefix: 'livestore-todo',
      storage: SecureStore,
    }),
  ],
})

export const { signIn, signOut, useSession } = authClient
