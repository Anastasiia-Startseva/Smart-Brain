"use client"

import { useChat } from '@ai-sdk/react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkles, Send } from 'lucide-react'
import { useNotes } from '@/src/store/use-notes'

export function AIChat() {
  const { notes, activeNoteId } = useNotes()
  const activeNote = notes.find(n => n.id === activeNoteId)
  const [input, setInput] = useState('')

  const { messages, sendMessage, status } = useChat()
  const isLoading = status === 'submitted' || status === 'streaming'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    void sendMessage(
      { text: trimmedInput },
      { body: { context: activeNote?.content } },
    )
    setInput('')
  }

  return (
    <div className="w-80 border-l bg-white flex flex-col h-screen">
      <div className="p-4 border-b flex items-center gap-2 font-semibold">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <span>AI Помощник</span>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-2 rounded-lg text-sm max-w-[85%] ${
                message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
              }`}>
                {message.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('')}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-xs text-slate-400 animate-pulse">AI думает...</div>}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Спроси AI..."
          className="text-sm"
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}