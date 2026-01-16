import { expect, test } from '@playwright/test'

// Generate unique user per test run to ensure clean state
const testRunId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
const testUser = {
  email: `e2e-web-${testRunId}@test.local`,
  password: 'password123',
  name: 'E2E Web Test User',
}

const API_URL = 'http://localhost:8787'

test.describe('Todo App E2E', () => {
  test.beforeAll(async ({ request }) => {
    // Register a fresh unique user for this test run
    const response = await request.post(`${API_URL}/api/register`, {
      data: testUser,
    })
    // Should succeed (201 Created) since this is a unique user
    expect(response.ok()).toBe(true)
  })

  test.beforeEach(async ({ page }) => {
    // Clear any existing session/storage for fresh state
    await page.context().clearCookies()
    await page.goto('/')
  })

  test('complete todo flow: login, create, complete, delete', async ({ page }) => {
    // Step 1: Login
    await expect(page.getByTestId('email-input')).toBeVisible()
    await page.getByTestId('email-input').fill(testUser.email)
    await page.getByTestId('password-input').fill(testUser.password)
    await page.getByTestId('login-button').click()

    // Wait for login to complete - should see todo input
    await expect(page.getByTestId('todo-input')).toBeVisible({ timeout: 15000 })

    // Delete the default "Welcome to livestore" todo first
    const welcomeTodo = page.locator('[data-testid^="todo-item-"]', {
      hasText: 'Welcome to livestore',
    })
    if (await welcomeTodo.isVisible()) {
      await welcomeTodo.locator('[data-testid^="todo-delete-"]').click()
      await expect(welcomeTodo).not.toBeVisible({ timeout: 3000 })
    }

    // Step 2: Create a todo
    const todoText = 'E2E Test Todo'
    await page.getByTestId('todo-input').fill(todoText)
    await page.getByTestId('todo-input').press('Enter')

    // Verify todo appears in list
    await expect(page.getByText(todoText)).toBeVisible({ timeout: 5000 })

    // Step 3: Mark todo as complete
    const todoItem = page.locator('[data-testid^="todo-item-"]', { hasText: todoText })
    const checkbox = todoItem.locator('[data-testid^="todo-checkbox-"]')
    await checkbox.click()

    // Verify todo shows as completed (has line-through style)
    const todoTextEl = todoItem.locator('[data-testid^="todo-text-"]')
    await expect(todoTextEl).toHaveClass(/line-through/)

    // Step 4: Delete the todo
    const deleteButton = todoItem.locator('[data-testid^="todo-delete-"]')
    await deleteButton.click()

    // Verify todo is removed
    await expect(page.getByText(todoText)).not.toBeVisible({ timeout: 5000 })
  })
})
