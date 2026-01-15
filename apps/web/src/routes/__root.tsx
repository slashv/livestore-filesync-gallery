import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AuthProvider, useAuth } from '~/components/AuthProvider'
import { LoginScreen } from '~/components/LoginScreen'

export const Route = createRootRoute({
  component: RootComponent,
})

function AuthGate() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <Outlet />
}

function RootComponent() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-gray-500">Loading...</div>
            </div>
          }
        >
          <AuthGate />
        </Suspense>
      </div>
    </AuthProvider>
  )
}
