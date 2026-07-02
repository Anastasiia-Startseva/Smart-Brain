"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Sparkles, Send, Loader2 } from "lucide-react"
import { useNotes } from "@/src/store/use-notes"
import { cn } from "@/lib/utils"

export function AIChat() {
  const { notes, activeNoteId } = useNotes()
  const activeNote = notes.find((note) => note.id === activeNoteId)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error, clearError } = useChat({
    onError: () => {
      // Error state is surfaced in UI below.
    },
  })

  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput || isLoading) return

    clearError?.()
    void sendMessage({ text: trimmedInput }, { body: { context: activeNote?.content } })
    setInput("")
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col border-t border-slate-200 bg-white shadow-lg lg:h-screen lg:w-80 lg:border-l lg:border-t-0 dark:border-slate-700 dark:bg-slate-900",
      )}
    >
      <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 font-semibold dark:border-slate-700 dark:from-indigo-950 dark:to-purple-950">
        <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-2">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-slate-900 dark:text-slate-50">AI Помощник</span>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
            Ответы с учётом текущей заметки
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && !error && (
            <div className="py-8 text-center text-sm text-slate-400">
              Спросите AI о содержимом заметки или попросите помочь с формулировкой.
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
            >
              {message.role === "assistant" && (
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "rounded-br-none bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                    : "rounded-bl-none bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
                )}
              >
                {message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("")}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              </div>
              <div className="px-3 py-3 text-xs text-slate-400">AI думает...</div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <p className="font-medium">Не удалось получить ответ</p>
                <p className="mt-1 text-xs opacity-90">
                  Проверьте OPENAI_API_KEY в .env.local и попробуйте снова.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Спросите AI..."
          className="border-slate-200 bg-white text-sm dark:border-slate-600 dark:bg-slate-900"
          disabled={isLoading}
          aria-label="Сообщение для AI"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
          aria-label="Отправить сообщение"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
