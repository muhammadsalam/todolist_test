import {
    useEffect,
    useRef,
    useState,
    type DragEvent,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import { useAppDispatch } from "../app/hooks";
import {
    deleteTodo,
    editTodo,
    toggleTodo,
} from "../features/todos/model/todosSlice";
import type { Todo } from "../features/todos/model/types";

type TodoItemProps = {
    todo: Todo;
    isDragging: boolean;
    isDropTarget: boolean;
    onDragStart: (id: string) => void;
    onDragOver: (id: string) => void;
    onDrop: (id: string) => void;
    onDragEnd: () => void;
};

function TodoItem({
    todo,
    isDragging,
    isDropTarget,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
}: TodoItemProps) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(todo.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    const startEditing = () => {
        setDraftText(todo.text);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setDraftText(todo.text);
        setIsEditing(false);
    };

    const saveEditing = () => {
        const nextText = draftText.trim();
        if (!nextText) {
            return;
        }
        dispatch(editTodo({ id: todo.id, text: nextText }));
        setIsEditing(false);
    };

    const handleEditKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveEditing();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            cancelEditing();
        }
    };

    const handleStartEditing = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        startEditing();
    };

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(deleteTodo(todo.id));
    };

    const handleDragStart = (event: DragEvent<HTMLLIElement>) => {
        if (isEditing) {
            event.preventDefault();
            return;
        }
        onDragStart(todo.id);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", todo.id);
    };

    const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        onDragOver(todo.id);
    };

    const handleDrop = (event: DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        onDrop(todo.id);
    };

    return (
        <li
            className={`todo-item-row ${isDragging ? "todo-item-dragging" : ""} ${isDropTarget ? "todo-item-drop-target" : ""}`}
            draggable={!isEditing}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={onDragEnd}
        >
            {isEditing ? (
                <div className="todo-item todo-item-static">
                    <div className="todo-item-main">
                        <input
                            className="todo-checkbox"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch(toggleTodo(todo.id))}
                            aria-label="Отметить выполнение"
                        />
                        <input
                            ref={inputRef}
                            className="todo-edit-input"
                            type="text"
                            value={draftText}
                            onChange={(event) =>
                                setDraftText(event.target.value)
                            }
                            onKeyDown={handleEditKeyDown}
                            aria-label="Редактировать задачу"
                        />
                    </div>
                    <div className="todo-item-actions">
                        <button
                            className="todo-button-save"
                            type="button"
                            onClick={saveEditing}
                        >
                            Сохранить
                        </button>
                        <button
                            className="todo-button-cancel"
                            type="button"
                            onClick={cancelEditing}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            ) : (
                <label className="todo-item">
                    <div className="todo-item-main">
                        <input
                            className="todo-checkbox"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch(toggleTodo(todo.id))}
                            aria-label="Отметить выполнение"
                        />
                        <span
                            className={`todo-text ${todo.completed ? "todo-text-completed" : ""}`}
                        >
                            {todo.text}
                        </span>
                    </div>
                    <div className="todo-item-actions">
                        <button
                            className="todo-button-edit"
                            type="button"
                            onClick={handleStartEditing}
                        >
                            Изменить
                        </button>
                        <button
                            className="todo-button-delete"
                            type="button"
                            onClick={handleDelete}
                        >
                            Удалить
                        </button>
                    </div>
                </label>
            )}
        </li>
    );
}

export default TodoItem;
