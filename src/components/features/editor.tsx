"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { AIToolbar } from './ai-toolbar'
import { useNotes } from '@/src/store/use-notes'

export function Editor() {
  const { notes, activeNoteId, updateNote } = useNotes()
  const activeNote = notes.find((n) => n.id === activeNoteId)

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote?.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none max-w-none min-h-screen text-base px-2 py-4 text-slate-900',
      },
    },
    onUpdate: ({ editor }) => {
      if (activeNoteId) {
        updateNote(activeNoteId, activeNote?.title || '', editor.getHTML())
      }
    },
  })

  const insertAIContent = (content: string) => {
    if (editor) {
      editor.commands.insertContent(`<div style="color: #4f46e5; border-left: 3px solid #4f46e5; padding-left: 12px; margin: 12px 0; background: #eef2ff; padding: 12px; border-radius: 6px;">${content}</div>`)
    }
  }

  useEffect(() => {
    if (editor && activeNote && editor.getHTML() !== activeNote.content) {
      editor.commands.setContent(activeNote.content)
    }
  }, [activeNote, activeNoteId, editor])

  if (!activeNote) return null

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 z-10">
          <AIToolbar onInsertContent={insertAIContent} />
        </div>
        
        <div className="px-8 py-6">
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => updateNote(activeNoteId!, e.target.value, activeNote.content)}
            className="w-full text-4xl font-bold mb-8 border-none outline-none placeholder:text-slate-300 text-slate-900"
            placeholder="Заголовок заметки..."
          />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}