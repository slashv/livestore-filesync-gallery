import { StoreRegistry } from '@livestore/livestore'
import { StoreRegistryProvider } from '@livestore/react'
import { StrictMode, Suspense } from 'react'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { TodoApp } from './components/TodoApp'
import './styles.css'

// Create store registry with batch updates for React
const storeRegistry = new StoreRegistry({
  defaultOptions: { batchUpdates },
})

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    <StoreRegistryProvider storeRegistry={storeRegistry}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-gray-500">Loading...</div>
          </div>
        }
      >
        <TodoApp />
      </Suspense>
    </StoreRegistryProvider>
  </StrictMode>
)
