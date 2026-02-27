import { useState, type FormEvent } from 'react'
import { useAppDispatch } from '../app/hooks'
import { addTodo } from '../features/todos/model/todosSlice'

function TodoInput() {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) {
      return
    }

    dispatch(addTodo(trimmedText))
    setText('')
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Новая задача"
        aria-label="Текст задачи"
      />
      <button className="todo-button-primary" type="submit">
        Добавить
      </button>
    </form>
  )
}

export default TodoInput
