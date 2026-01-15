import type { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'LiveStore Todo',
  slug: 'livestore-todo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.livestore.todo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.livestore.todo',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    // Use LIVESTORE_SYNC_URL env var, or default to localhost for simulator
    LIVESTORE_SYNC_URL: process.env.LIVESTORE_SYNC_URL ?? 'http://localhost:8787/sync',
    LIVESTORE_STORE_ID: process.env.LIVESTORE_STORE_ID ?? 'todo-app',
  },
})
