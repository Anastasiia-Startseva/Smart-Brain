import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  addNote: () => void;
  setActiveNote: (id: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
}

export const useNotes = create<NotesState>((set) => ({
  notes: [
    { 
      id: '1', 
      title: 'Моя первая заметка', 
      content: '<p>Добро пожаловать в SmartBrain! Попробуйте отредактировать этот текст.</p>', 
      createdAt: Date.now() 
    }
  ],
  activeNoteId: '1',

  addNote: () => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(7),
      title: 'Новая заметка',
      content: '',
      createdAt: Date.now(),
    };
    set((state) => ({ 
      notes: [newNote, ...state.notes], 
      activeNoteId: newNote.id 
    }));
  },

  setActiveNote: (id) => set({ activeNoteId: id }),

  updateNote: (id, title, content) => {
    set((state) => ({
      notes: state.notes.map((n) => 
        n.id === id ? { ...n, title, content } : n
      ),
    }));
  },
}));