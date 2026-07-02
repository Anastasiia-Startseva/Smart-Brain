"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, NotebookPen, Search, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotes } from "@/src/store/use-notes"
import { Input } from "@/components/ui/input"

export function Sidebar() {
  const { notes, activeNoteId, addNote, setActiveNote, deleteNote, searchQuery, setSearchQuery } = useNotes()

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-64 border-r border-slate-200 bg-white h-screen flex flex-col shadow-sm">
      <div className="p-4 border-b border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-lg">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
              <NotebookPen className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900">SmartBrain</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={addNote}
            className="hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Поиск заметок..." 
            className="pl-10 h-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1 p-3">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            Заметки не найдены
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <div key={note.id} className="group relative">
                <button
                  onClick={() => setActiveNote(note.id)}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-lg text-sm mb-1 transition-all duration-200",
                    activeNoteId === note.id 
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md border border-indigo-200 text-indigo-700 font-medium" 
                      : "hover:bg-slate-50 text-slate-700 hover:shadow-sm"
                  )}
                >
                  <div className="truncate pr-8">{note.title || "Без названия"}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(note.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </button>
                <Button
                  variant="ghost" size="sm"
                  className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  onClick={(e) => { 
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}