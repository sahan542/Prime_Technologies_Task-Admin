"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import ToolBar from "./Toolbar";

type TTextEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ content, onChange }: TTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {},
        heading: { levels: [1, 2, 3, 4, 5, 6] }, // Configure heading inside StarterKit
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-3" }, // Ordered List
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-3" }, // Bullet List
        },
      }), // Enables undo/redo
      TextAlign.configure({ types: ["heading", "paragraph"] }),

      Highlight,
      Underline, // Adding underline support
    ],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[180px] max-h-[240] overflow-auto border rounded-md focus:outline-none py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="html-content">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

// npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-underline
