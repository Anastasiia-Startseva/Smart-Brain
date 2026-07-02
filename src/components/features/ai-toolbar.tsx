"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Wand2, FileText, CheckCheck, Loader2, AlertCircle } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { useNotes } from "@/src/store/use-notes"

interface AIToolbarProps {
  onInsertContent: (content: string) => void
}

export function AIToolbar({ onInsertContent }: AIToolbarProps) {
  const { notes, activeNoteId } = useNotes()
  const activeNote = notes.find((note) => note.id === activeNoteId)

  const { sendMessage, status, error, clearError } = useChat({
    onFinish: ({ message }) => {
      const content = message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("")

      if (content) onInsertContent(content)
    },
  })

  const isLoading = status === "submitted" || status === "streaming"

  const runCommand = (command: string) => {
    if (!activeNote || isLoading) return

    clearError?.()
    void sendMessage(
      {
        text: `Примени команду "${command}" к следующему тексту и верни только результат без лишних слов:\n\n${activeNote.content}`,
      },
      { body: { context: activeNote.content } },
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 dark:border-indigo-900 dark:from-indigo-950 dark:to-purple-950">
        <div className="flex items-center gap-2 border-r border-indigo-200 pr-3 text-xs font-semibold text-indigo-600 dark:border-indigo-800 dark:text-indigo-300">
          <Sparkles className="h-4 w-4" />
          AI команды
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs hover:bg-white hover:text-indigo-700 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
          onClick={() => runCommand("Исправь грамматические ошибки")}
          disabled={isLoading || !activeNote}
        >
          <CheckCheck className="h-4 w-4" /> Исправить
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs hover:bg-white hover:text-indigo-700 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
          onClick={() => runCommand("Сделай краткую выжимку (summary)")}
          disabled={isLoading || !activeNote}
        >
          <FileText className="h-4 w-4" /> Саммари
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs hover:bg-white hover:text-indigo-700 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
          onClick={() => runCommand("Перепиши в более профессиональном стиле")}
          disabled={isLoading || !activeNote}
        >
          <Wand2 className="h-4 w-4" /> Профессионально
        </Button>

        {isLoading && (
          <div className="ml-auto flex items-center gap-2 px-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
            <Loader2 className="h-3 w-3 animate-spin" />
            AI работает...
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          AI недоступен. Проверьте ключ API в .env.local
        </div>
      )}
    </div>
  )
}
