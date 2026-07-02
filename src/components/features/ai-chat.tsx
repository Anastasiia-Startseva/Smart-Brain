"use client"

import { useChat } from '@ai-sdk/react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkles, Send, Loader2 } from 'lucide-react'
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
    <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-screen shadow-lg">
      <div className="p-4 border-b border-slate-200 flex items-center gap-3 font-semibold bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-slate-900">AI Помощник</span>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              Начните диалог с AI
            </div>
          )}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`p-3 rounded-lg text-sm max-w-[85%] ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none' 
                  : 'bg-slate-100 text-slate-900 rounded-bl-none'
              }`}>
                {message.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('')}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="text-xs text-slate-400 py-3 px-3">
                AI думает...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 flex gap-2 bg-slate-50">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Спроси AI..."
          className="text-sm bg-white border-slate-200"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}