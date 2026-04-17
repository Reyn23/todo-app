import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type SetState<T> = Dispatch<SetStateAction<T>>

export function useLocalStorageState<T>(key: string, initialValue: T): [T, SetState<T>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initialValue
      return JSON.parse(raw) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // If storage is full/blocked, we still want the app to work in-memory.
    }
  }, [key, value])

  return [value, setValue]
}

