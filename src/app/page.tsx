"use client"

import { AIChat } from "@/src/components/features/ai-chat"
import { Editor } from "@/src/components/features/editor"
import { MobileHeader } from "@/src/components/shared/mobile-header"
import { Sidebar } from "@/src/components/shared/sidebar"
import { useKeyboardShortcuts } from "@/src/hooks/use-keyboard-shortcuts"
import { useMobileSidebar } from "@/src/hooks/use-mobile-sidebar"
import { useNotes } from "@/src/store/use-notes"
import { Sparkles } from "lucide-react"

export default function Home() {
  const { activeNoteId, notes, addNote } = useNotes()
  const { isOpen, open, close } = useMobileSidebar()

  useKeyboardShortcuts({
    onNewNote: addNote,
    onFocusSearch: () => {
      open()
      requestAnimationFrame(() => {
        document.querySelector<HTMLInputElement>('input[aria-label="Поиск заметок"]')?.focus()
      })
    },
  })

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      <MobileHeader onMenuClick={open} />

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar isMobileOpen={isOpen} onMobileClose={close} />

        {activeNoteId ? (
          <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
            <Editor />
            <AIChat />
          </div>
        ) : (
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
            <div className="animate-blob absolute left-10 top-20 h-72 w-72 rounded-full bg-indigo-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-indigo-900 dark:opacity-30" />
            <div className="animate-blob absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-200 opacity-20 mix-blend-multiply blur-3xl filter [animation-delay:2s] dark:bg-purple-900 dark:opacity-30" />

            <div className="relative z-10 px-6 text-center">
              <div className="mb-8 inline-block rounded-2xl border border-white/60 bg-white/40 p-6 shadow-2xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60">
                <Sparkles className="mx-auto h-16 w-16 animate-pulse text-indigo-600 dark:text-indigo-400" />
              </div>

              <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl dark:text-slate-50">
                SmartBrain
              </h1>
              <h2 className="mb-3 text-xl font-semibold text-slate-700 sm:text-2xl dark:text-slate-300">
                AI-заметки для продуктивной работы
              </h2>

              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {notes.length === 0
                  ? "Создайте первую заметку и используйте AI для редактирования, саммари и диалога по контексту."
                  : "Выберите заметку слева или создайте новую с помощью Ctrl+N."}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="rounded-full border border-slate-200 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
                  Rich-text редактор
                </span>
                <span className="rounded-full border border-slate-200 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
                  AI-чат с контекстом
                </span>
                <span className="rounded-full border border-slate-200 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
                  Локальное хранение
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
