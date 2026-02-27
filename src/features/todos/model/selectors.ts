import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'

export const selectTodosState = (state: RootState) => state.todos

export const selectTodos = createSelector(
  [selectTodosState],
  (todosState) => todosState.items,
)

export const selectFilter = createSelector(
  [selectTodosState],
  (todosState) => todosState.filter,
)

export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
    return todos
  },
)
