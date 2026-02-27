import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectFilter } from '../features/todos/model/selectors'
import { setFilter } from '../features/todos/model/todosSlice'
import type { TodoFilter } from '../features/todos/model/types'

const filterOptions: Array<{ value: TodoFilter; label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

function TodoFilters() {
  const dispatch = useAppDispatch()
  const activeFilter = useAppSelector(selectFilter)

  return (
    <div className="todo-filters">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`todo-filter-button ${activeFilter === option.value ? 'todo-filter-button-active' : ''}`}
          onClick={() => dispatch(setFilter(option.value))}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters
