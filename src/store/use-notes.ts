import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addNote: () => void;
  setActiveNote: (id: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotes = create<NotesState>()(
  persist(
    (set) => ({
      notes: [{ id: '1', title: 'Первая заметка', content: '<p>Привет!</p>', createdAt: Date.now() }],
      activeNoteId: '1',
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      addNote: () => {
        const newNote = { id: Math.random().toString(36).substring(7), title: '', content: '', createdAt: Date.now() };
        set((state) => ({ notes: [newNote, ...state.notes], activeNoteId: newNote.id }));
      },
      setActiveNote: (id) => set({ activeNoteId: id }),
      updateNote: (id, title, content) => set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, title, content } : n)),
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
        activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
      })),
    }),
    { name: 'smart-brain-storage' }
  )
);