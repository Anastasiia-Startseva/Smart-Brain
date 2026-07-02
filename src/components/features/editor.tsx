"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"
import { AIToolbar } from "./ai-toolbar"
import { useNotes } from "@/src/store/use-notes"

export function Editor() {
  const { notes, activeNoteId, updateNote } = useNotes()
  const activeNote = notes.find((note) => note.id === activeNoteId)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Начните писать заметку...",
      }),
    ],
    content: activeNote?.content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert focus:outline-none max-w-none text-base text-slate-900 dark:text-slate-100",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      if (activeNoteId) {
        updateNote(activeNoteId, activeNote?.title || "", currentEditor.getHTML())
      }
    },
  })

  const insertAIContent = (content: string) => {
    editor?.commands.insertContent(
      `<blockquote><p><strong>AI:</strong> ${content}</p></blockquote>`,
    )
  }

  useEffect(() => {
    if (editor && activeNote && editor.getHTML() !== activeNote.content) {
      editor.commands.setContent(activeNote.content)
    }
  }, [activeNote, activeNoteId, editor])

  if (!activeNote) return null

  return (
    <div className="h-full flex-1 overflow-y-auto bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 p-3 backdrop-blur sm:p-4 dark:border-slate-700 dark:bg-slate-900/95">
          <AIToolbar onInsertContent={insertAIContent} />
        </div>

        <div className="prose-editor px-4 py-6 sm:px-8">
          <input
            type="text"
            value={activeNote.title}
            onChange={(event) =>
              updateNote(activeNoteId!, event.target.value, activeNote.content)
            }
            className="mb-8 w-full border-none bg-transparent text-3xl font-bold text-slate-900 outline-none placeholder:text-slate-300 sm:text-4xl dark:text-slate-50 dark:placeholder:text-slate-600"
            placeholder="Заголовок заметки..."
            aria-label="Заголовок заметки"
          />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
