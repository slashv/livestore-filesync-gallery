const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

// Find the project and workspace directories
const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot]

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

// 3. Enable package exports resolution for better-auth
config.resolver.unstable_enablePackageExports = true

// 4. Mock out PushNotificationIOS to prevent NativeEventEmitter errors
// This module is deprecated and throws errors when the native module isn't linked.
// Since we don't use push notifications, we return an empty module.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('PushNotificationIOS')) {
    return { type: 'empty' }
  }

  // Use default resolution for everything else
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
