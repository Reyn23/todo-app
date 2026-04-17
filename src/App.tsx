import './App.css'
import { useMemo } from 'react'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { Todo } from './types/todo'

const STORAGE_KEY = 'todo-app.todos.v1'

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [todos, setTodos] = useLocalStorageState<Todo[]>(STORAGE_KEY, [])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.reduce((acc, t) => (t.completed ? acc + 1 : acc), 0)
    return { total, completed, remaining: total - completed }
  }, [todos])

  function addTodo(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const now = Date.now()
    const next: Todo = { id: createId(), text: trimmed, completed: false, createdAt: now }
    setTodos((prev) => [next, ...prev])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="page">
      <div className="shell">
        <header className="header">
          <div className="titleBlock">
            <h1 className="title">To-do</h1>
            <p className="subtitle">A tiny, fast list that saves automatically.</p>
          </div>
          <div className="stats" aria-label="Task stats">
            <div className="stat">
              <div className="statLabel">Total</div>
              <div className="statValue">{stats.total}</div>
            </div>
            <div className="stat">
              <div className="statLabel">Remaining</div>
              <div className="statValue">{stats.remaining}</div>
            </div>
            <div className="stat">
              <div className="statLabel">Done</div>
              <div className="statValue">{stats.completed}</div>
            </div>
          </div>
        </header>

        <main className="card">
          <TodoInput onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </main>

        <footer className="footer">
          <span className="hint">
            Tip: type a task and press <kbd>Enter</kbd>.
          </span>
        </footer>
      </div>
    </div>
  )
}
