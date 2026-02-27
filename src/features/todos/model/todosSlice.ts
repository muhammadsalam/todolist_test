import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TodoFilter, TodosState } from './types'

type MoveTodoPayload = {
  fromId: string
  toId: string
}

type EditTodoPayload = {
  id: string
  text: string
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const text = action.payload.trim()
      if (!text) {
        return
      }

      state.items.unshift({
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      })
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<EditTodoPayload>) => {
      const text = action.payload.text.trim()
      if (!text) {
        return
      }

      const todo = state.items.find((item) => item.id === action.payload.id)
      if (todo) {
        todo.text = text
      }
    },
    moveTodo: (state, action: PayloadAction<MoveTodoPayload>) => {
      const { fromId, toId } = action.payload
      if (fromId === toId) {
        return
      }

      const fromIndex = state.items.findIndex((item) => item.id === fromId)
      const toIndex = state.items.findIndex((item) => item.id === toId)

      if (fromIndex === -1 || toIndex === -1) {
        return
      }

      const [movedItem] = state.items.splice(fromIndex, 1)
      state.items.splice(toIndex, 0, movedItem)
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload
    },
    setStateFromStorage: (_state, action: PayloadAction<TodosState>) =>
      action.payload,
  },
})

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  moveTodo,
  setFilter,
  setStateFromStorage,
} = todosSlice.actions

export default todosSlice.reducer
