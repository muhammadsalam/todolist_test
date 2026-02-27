import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectFilter, selectVisibleTodos } from '../features/todos/model/selectors'
import { moveTodo } from '../features/todos/model/todosSlice'
import TodoItem from './TodoItem'

function TodoList() {
  const dispatch = useAppDispatch()
  const activeFilter = useAppSelector(selectFilter)
  const visibleTodos = useAppSelector(selectVisibleTodos)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  const handleDragStart = (id: string) => {
    setDraggedId(id)
    setDropTargetId(id)
  }

  const handleDragOver = (id: string) => {
    if (id !== dropTargetId) {
      setDropTargetId(id)
    }
  }

  const handleDrop = (id: string) => {
    if (draggedId && draggedId !== id) {
      dispatch(moveTodo({ fromId: draggedId, toId: id }))
    }
    setDraggedId(null)
    setDropTargetId(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDropTargetId(null)
  }

  if (visibleTodos.length === 0) {
    if (activeFilter === 'active') {
      return <p className="todo-empty-state">Активных задач нет</p>
    }

    if (activeFilter === 'completed') {
      return <p className="todo-empty-state">Выполненных задач нет</p>
    }

    return <p className="todo-empty-state">Список задач пуст</p>
  }

  return (
    <div className="todo-list-wrap">
      <p className="todo-sort-hint">Перетащите задачу, чтобы поменять порядок</p>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isDragging={draggedId === todo.id}
            isDropTarget={dropTargetId === todo.id && draggedId !== todo.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
