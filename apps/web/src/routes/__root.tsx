import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-500">Loading...</div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  )
}
