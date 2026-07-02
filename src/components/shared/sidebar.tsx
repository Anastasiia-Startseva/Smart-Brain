"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatNoteDate, matchesNoteSearch } from "@/src/lib/note-utils"
import { useNotes } from "@/src/store/use-notes"
import { useTheme } from "@/src/hooks/use-theme"
import { Input } from "@/components/ui/input"
import { Moon, NotebookPen, Plus, Search, Sun, Trash2, X } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { ConfirmDialog } from "./confirm-dialog"

interface SidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const {
    notes,
    activeNoteId,
    addNote,
    setActiveNote,
    deleteNote,
    searchQuery,
    setSearchQuery,
  } = useNotes()
  const { theme, toggleTheme, mounted } = useTheme()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)

  const filteredNotes = useMemo(
    () => notes.filter((note) => matchesNoteSearch(note.title, note.content, searchQuery)),
    [notes, searchQuery],
  )

  const handleSelectNote = (id: string) => {
    setActiveNote(id)
    onMobileClose?.()
  }

  const handleAddNote = () => {
    addNote()
    onMobileClose?.()
  }

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete)
      setNoteToDelete(null)
    }
  }

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          aria-label="Закрыть меню"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm transition-transform duration-300 lg:static lg:translate-x-0 dark:border-slate-700 dark:bg-slate-900",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="space-y-4 border-b border-slate-200 p-4 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-bold">
              <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-2">
                <NotebookPen className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-slate-900 dark:text-slate-50">SmartBrain</span>
                <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  {notes.length} {notes.length === 1 ? "заметка" : "заметок"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden lg:inline-flex"
                aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddNote}
                className="hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                aria-label="Создать заметку"
              >
                <Plus className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileClose}
                className="lg:hidden"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              ref={searchInputRef}
              placeholder="Поиск заметок..."
              className="h-10 border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Поиск заметок"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-3">
          {filteredNotes.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              {searchQuery ? "Заметки не найдены" : "Создайте первую заметку"}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotes.map((note) => (
                <div key={note.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => handleSelectNote(note.id)}
                    className={cn(
                      "mb-1 w-full rounded-lg px-3 py-3 text-left text-sm transition-all duration-200",
                      activeNoteId === note.id
                        ? "border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 font-medium text-indigo-700 shadow-md dark:border-indigo-800 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-200"
                        : "text-slate-700 hover:bg-slate-50 hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-800",
                    )}
                  >
                    <div className="truncate pr-8">{note.title || "Без названия"}</div>
                    <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {formatNoteDate(note.createdAt)}
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-950"
                    aria-label={`Удалить заметку ${note.title || "Без названия"}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setNoteToDelete(note.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="hidden border-t border-slate-200 p-3 text-xs text-slate-500 lg:block dark:border-slate-700 dark:text-slate-400">
          <kbd className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">Ctrl+N</kbd> новая заметка ·{" "}
          <kbd className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">Ctrl+K</kbd> поиск
        </div>
      </aside>

      <ConfirmDialog
        open={Boolean(noteToDelete)}
        title="Удалить заметку?"
        description="Это действие нельзя отменить. Заметка будет удалена из локального хранилища."
        onConfirm={handleConfirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />
    </>
  )
}
