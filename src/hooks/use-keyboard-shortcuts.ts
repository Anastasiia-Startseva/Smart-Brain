"use client"

import { useEffect } from "react"

interface KeyboardShortcutsOptions {
  onNewNote: () => void
  onFocusSearch: () => void
}

export function useKeyboardShortcuts({ onNewNote, onFocusSearch }: KeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.ctrlKey || event.metaKey

      if (isMeta && event.key.toLowerCase() === "n") {
        event.preventDefault()
        onNewNote()
      }

      if (isMeta && event.key.toLowerCase() === "k") {
        event.preventDefault()
        onFocusSearch()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNewNote, onFocusSearch])
}
