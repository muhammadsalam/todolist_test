import type { Todo, TodoFilter, TodosState } from '../model/types'

const STORAGE_KEY = 'пасхалка_пон'

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isTodo = (value: unknown): value is Todo => {
  if (!isObject(value)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    typeof value.completed === 'boolean' &&
    typeof value.createdAt === 'number'
  )
}

const isFilter = (value: unknown): value is TodoFilter =>
  value === 'all' || value === 'active' || value === 'completed'

const isTodosState = (value: unknown): value is TodosState => {
  if (!isObject(value)) {
    return false
  }

  if (!Array.isArray(value.items)) {
    return false
  }

  if (!isFilter(value.filter)) {
    return false
  }

  return value.items.every(isTodo)
}

export const loadTodosState = (): TodosState | undefined => {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return undefined
    }

    const parsedValue: unknown = JSON.parse(rawValue)
    if (!isTodosState(parsedValue)) {
      return undefined
    }

    return parsedValue
  } catch {
    return undefined
  }
}

export const saveTodosState = (state: TodosState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    return
  }
}
