"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, NotebookPen, Search, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotes } from "@/src/store/use-notes"
import { Input } from "@base-ui/react/input"

export function Sidebar() {
  const { notes, activeNoteId, addNote, setActiveNote, deleteNote, searchQuery, setSearchQuery } = useNotes()

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-64 border-r bg-slate-50/50 h-screen flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold"><NotebookPen className="w-5 h-5 text-indigo-600"/> SmartBrain</div>
          <Button variant="ghost" size="icon" onClick={addNote}><Plus className="w-4 h-4"/></Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Поиск..." 
            className="pl-8 h-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1 p-2">
        {filteredNotes.map((note) => (
          <div key={note.id} className="group relative">
            <button
              onClick={() => setActiveNote(note.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-all",
                activeNoteId === note.id ? "bg-white shadow-sm border border-slate-200 text-indigo-600" : "hover:bg-slate-200/50 text-slate-600"
              )}
            >
              <div className="truncate pr-6">{note.title || "Без названия"}</div>
            </button>
            <Button
              variant="ghost" size="icon"
              className="absolute right-1 top-1 h-7 w-7 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}