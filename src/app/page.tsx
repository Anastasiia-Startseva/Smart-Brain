"use client"

import { AIChat } from "@/src/components/features/ai-chat"
import { Editor } from "@/src/components/features/editor"
import { Sidebar } from "@/src/components/shared/sidebar"
import { useNotes } from "@/src/store/use-notes"
import { Sparkles } from "lucide-react"

export default function Home() {
  const { activeNoteId, notes } = useNotes()

  return (
    <main className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      {activeNoteId ? (
        <>
          <Editor />
          <AIChat />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-8 inline-block p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-2xl">
              <Sparkles className="w-16 h-16 text-indigo-600 animate-pulse mx-auto" />
            </div>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-4">SmartBrain</h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-3">Готов к работе</h2>
            
            <p className="text-slate-600 text-lg mt-4 max-w-md mx-auto leading-relaxed">
              {notes.length === 0 
                ? "✨ Создайте свою первую заметку прямо сейчас и начните общаться с AI" 
                : "📝 Выберите заметку слева, чтобы начать редактирование"}
            </p>
            
            <div className="mt-8 flex gap-3 justify-center text-sm text-slate-500">
              <span className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200">💡 Умные подсказки</span>
              <span className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200">🚀 Быстрые команды</span>
              <span className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200">⚡ Мгновенный результат</span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}