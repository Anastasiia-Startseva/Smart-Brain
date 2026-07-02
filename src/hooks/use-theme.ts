"use client"

import { useCallback, useSyncExternalStore } from "react"

type Theme = "light" | "dark"

let currentTheme: Theme | null = null
const listeners = new Set<() => void>()

function resolveTheme(): Theme {
  if (typeof window === "undefined") return "light"

  if (currentTheme) return currentTheme

  const stored = localStorage.getItem("smart-brain-theme") as Theme | null
  if (stored === "light" || stored === "dark") {
    currentTheme = stored
  } else {
    currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  document.documentElement.classList.toggle("dark", currentTheme === "dark")
  return currentTheme
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => listeners.delete(onStoreChange)
}

function notifyThemeChange() {
  listeners.forEach((listener) => listener())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, resolveTheme, () => "light")
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light"
    currentTheme = nextTheme
    localStorage.setItem("smart-brain-theme", nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    notifyThemeChange()
  }, [theme])

  return { theme, toggleTheme, mounted }
}
