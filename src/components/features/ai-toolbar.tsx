"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Wand2, FileText, CheckCheck } from "lucide-react"
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
    <div className="flex gap-2 p-2 mb-4 bg-slate-50 border rounded-lg animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 px-2 text-xs font-medium text-slate-500 border-r mr-2">
        <Sparkles className="w-3 h-3 text-indigo-500" />
        AI Магия
      </div>
      
      <Button 
        variant="ghost" size="sm" className="h-8 text-xs gap-2"
        onClick={() => runCommand("Исправь грамматические ошибки")}
        disabled={isLoading}
      >
        <CheckCheck className="w-3 h-3" /> Исправить ошибки
      </Button>

      <Button 
        variant="ghost" size="sm" className="h-8 text-xs gap-2"
        onClick={() => runCommand("Сделай краткую выжимку (summary)")}
        disabled={isLoading}
      >
        <FileText className="w-3 h-3" /> Саммари
      </Button>

      <Button 
        variant="ghost" size="sm" className="h-8 text-xs gap-2"
        onClick={() => runCommand("Перепиши в более профессиональном стиле")}
        disabled={isLoading}
      >
        <Wand2 className="w-3 h-3" /> Проф. стиль
      </Button>

      {isLoading && (
        <div className="ml-auto flex items-center text-[10px] text-indigo-600 animate-pulse font-medium px-2">
          AI работает...
        </div>
      )}
    </div>
  )
}