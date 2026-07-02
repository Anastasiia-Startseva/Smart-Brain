"use client"

import { Button } from "@/components/ui/button"
import { Menu, Moon, NotebookPen, Sun } from "lucide-react"
import { useTheme } from "@/src/hooks/use-theme"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-50">
        <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5">
          <NotebookPen className="h-4 w-4 text-white" />
        </div>
        SmartBrain
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Открыть меню">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
