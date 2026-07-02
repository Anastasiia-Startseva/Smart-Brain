"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, NotebookPen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotes } from "@/src/store/use-notes"

export function Sidebar() {
  const { notes, activeNoteId, addNote, setActiveNote } = useNotes()

  return (
    <div className="w-64 border-r bg-slate-50/50 h-screen flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <NotebookPen className="w-5 h-5 text-indigo-600" />
          <span>SmartBrain</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={addNote}
          className="h-8 w-8 text-slate-500 hover:text-indigo-600"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Список заметок */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                activeNoteId === note.id 
                  ? "bg-white shadow-sm border border-slate-200 text-indigo-600 font-medium" 
                  : "hover:bg-slate-200/50 text-slate-600 hover:text-slate-900"
              )}
            >
              <div className="truncate">{note.title || "Без названия"}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}