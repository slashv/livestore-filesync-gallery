import { useState } from 'react'
import { useAuth } from './AuthProvider'

export function LoginScreen() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-4">
        <h1 className="text-4xl font-thin text-center text-rose-800 mb-8">todos</h1>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                data-testid="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test1@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                data-testid="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div data-testid="login-error" className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              data-testid="login-button"
              disabled={isLoading}
              className="w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Test accounts: test1@example.com or test2@example.com
            <br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  )
}
