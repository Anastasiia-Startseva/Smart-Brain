import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
}

interface NotesState {
  notes: Note[]
  activeNoteId: string | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  addNote: () => void
  setActiveNote: (id: string) => void
  updateNote: (id: string, title: string, content: string) => void
  deleteNote: (id: string) => void
}

const demoNote: Note = {
  id: "demo-note",
  title: "Добро пожаловать в SmartBrain",
  content:
    "<p>Это демо-заметка. Попробуйте AI-команды в панели сверху или задайте вопрос в чате справа.</p><p><strong>Пример:</strong> попросите AI сделать краткое саммари этого текста.</p>",
  createdAt: Date.now(),
}

export const useNotes = create<NotesState>()(
  persist(
    (set) => ({
      notes: [demoNote],
      activeNoteId: null,
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      addNote: () => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title: "",
          content: "",
          createdAt: Date.now(),
        }
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }))
      },
      setActiveNote: (id) => set({ activeNoteId: id }),
      updateNote: (id, title, content) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, title, content } : note,
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
        })),
    }),
    { name: "smart-brain-storage" },
  ),
)
