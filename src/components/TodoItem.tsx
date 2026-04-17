import type { Todo } from '../types/todo'

export function TodoItem(props: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  const { todo, onToggle, onDelete } = props

  const checkboxId = `todo-${todo.id}`

  return (
    <li className="item">
      <div className="itemMain">
        <input
          id={checkboxId}
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label htmlFor={checkboxId} className={todo.completed ? 'text textDone' : 'text'}>
          {todo.text}
        </label>
      </div>
      <button
        className="iconButton"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete: ${todo.text}`}
        title="Delete"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M9 3h6l1 2h5v2H3V5h5l1-2Zm1 7h2v9h-2v-9Zm4 0h2v9h-2v-9ZM7 10h2v9H7v-9Z"
          />
        </svg>
      </button>
    </li>
  )
}

