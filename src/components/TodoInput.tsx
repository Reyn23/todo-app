import { useId, useState } from 'react'

export function TodoInput(props: { onAdd: (text: string) => void }) {
  const { onAdd } = props
  const [text, setText] = useState('')
  const inputId = useId()

  function submit() {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form
      className="inputRow"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <label className="srOnly" htmlFor={inputId}>
        Add a task
      </label>
      <input
        id={inputId}
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task…"
        autoComplete="off"
        inputMode="text"
      />
      <button className="primaryButton" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}

