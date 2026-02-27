export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type TodoFilter = 'all' | 'active' | 'completed'

export type TodosState = {
  items: Todo[]
  filter: TodoFilter
}
