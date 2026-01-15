import { nanoid } from '@livestore/livestore'
import type { Store } from '@livestore/livestore'
import { events, type schema, tables } from '@repo/schema'

type AppStore = Store<typeof schema>

// Todo type derived from the table schema
export type Todo = {
  id: string
  text: string
  completed: boolean
  deletedAt: Date | null
}

export type Filter = 'all' | 'active' | 'completed'

// Query for visible (non-deleted) todos
export const visibleTodosQuery = tables.todos.select().where({ deletedAt: null })

// Query for active (non-completed, non-deleted) todos
export const activeTodosQuery = tables.todos.select().where({ completed: false, deletedAt: null })

// Query for completed (non-deleted) todos
export const completedTodosQuery = tables.todos.select().where({ completed: true, deletedAt: null })

// Actions for todo operations
export function createTodoActions(store: AppStore) {
  return {
    addTodo: (text: string) => {
      if (text.trim()) {
        store.commit(events.todoCreated({ id: nanoid(), text: text.trim() }))
      }
    },

    toggleTodo: (id: string, completed: boolean) => {
      if (completed) {
        store.commit(events.todoUncompleted({ id }))
      } else {
        store.commit(events.todoCompleted({ id }))
      }
    },

    deleteTodo: (id: string) => {
      store.commit(events.todoDeleted({ id, deletedAt: new Date() }))
    },

    clearCompleted: () => {
      store.commit(events.todoClearedCompleted({ deletedAt: new Date() }))
    },

    setFilter: (filter: Filter) => {
      store.commit(events.uiStateSet({ filter }))
    },

    setNewTodoText: (newTodoText: string) => {
      store.commit(events.uiStateSet({ newTodoText }))
    },
  }
}
