import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

export function TodoList(props: {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  const { todos, onToggle, onDelete } = props

  if (todos.length === 0) {
    return (
      <div className="empty" role="status" aria-live="polite">
        <div className="emptyTitle">Nothing here yet</div>
        <div className="emptyBody">Add your first task above. It’ll be saved automatically.</div>
      </div>
    )
  }

  return (
    <ul className="list" aria-label="Tasks">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

