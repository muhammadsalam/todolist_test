import { useEffect } from 'react'
import TodoFilters from './components/TodoFilters'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useAppSelector } from './app/hooks'
import { saveTodosState } from './features/todos/lib/storage'
import { selectTodosState } from './features/todos/model/selectors'

function App() {
  const todosState = useAppSelector(selectTodosState)

  useEffect(() => {
    saveTodosState(todosState)
  }, [todosState])

  return (
    <div className="page">
      <main className="todo-container">
        <h1 className="todo-title">Список дел</h1>
        <TodoInput />
        <TodoFilters />
        <TodoList />
      </main>
    </div>
  )
}

export default App
