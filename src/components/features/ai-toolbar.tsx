"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Wand2, FileText, CheckCheck, Loader2 } from "lucide-react"
import { useChat } from '@ai-sdk/react'
import { useNotes } from '@/src/store/use-notes'

interface AIToolbarProps {
  onInsertContent: (content: string) => void;
}

export function AIToolbar({ onInsertContent }: AIToolbarProps) {
  const { notes, activeNoteId } = useNotes()
  const activeNote = notes.find((n) => n.id === activeNoteId)

  const { sendMessage, status } = useChat({
    onFinish: ({ message }) => {
      const content = message.parts
        .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
        .map((part) => part.text)
        .join('')

      onInsertContent(content)
    }
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  const runCommand = (command: string) => {
    if (!activeNote) return

    void sendMessage(
      {
        text: `Примени команду "${command}" к следующему тексту и верни только результат без лишних слов:\n\n${activeNote.content}`
      },
      {
        body: {
          context: activeNote.content
        }
      }
    )
  }

  return (
    <div className="flex gap-2 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg animate-in slide-in-from-top-2">
      <div className="flex items-center gap-2 px-3 text-xs font-semibold text-indigo-600 border-r border-indigo-200 pr-3">
        <Sparkles className="w-4 h-4" />
        AI Магия
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-xs gap-2 hover:bg-white hover:text-indigo-700"
        onClick={() => runCommand("Исправь грамматические ошибки")}
        disabled={isLoading || !activeNote}
      >
        <CheckCheck className="w-4 h-4" /> Исправить
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-xs gap-2 hover:bg-white hover:text-indigo-700"
        onClick={() => runCommand("Сделай краткую выжимку (summary)")}
        disabled={isLoading || !activeNote}
      >
        <FileText className="w-4 h-4" /> Саммари
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-xs gap-2 hover:bg-white hover:text-indigo-700"
        onClick={() => runCommand("Перепиши в более профессиональном стиле")}
        disabled={isLoading || !activeNote}
      >
        <Wand2 className="w-4 h-4" /> Профессионально
      </Button>

      {isLoading && (
        <div className="ml-auto flex items-center gap-2 text-xs text-indigo-600 font-semibold px-3">
          <Loader2 className="w-3 h-3 animate-spin" />
          AI работает...
        </div>
      )}
    </div>
  )
}