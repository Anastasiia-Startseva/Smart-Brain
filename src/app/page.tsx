"use client"

import { Sidebar } from "lucide-react"
import { AIChat } from "../components/features/ai-chat"
import { useNotes } from "../store/use-notes"
import { Editor } from "../components/features/editor"


export default function Home() {
  const { activeNoteId } = useNotes()

  return (
    <main className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      {activeNoteId ? (
        <>
          <Editor />
          <AIChat />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <p>Выберите заметку или создайте новую, чтобы начать работу</p>
        </div>
      )}
    </main>
  )
}