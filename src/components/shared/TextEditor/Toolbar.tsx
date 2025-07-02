"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo,
} from "lucide-react";

type TToolBarProps = {
  editor: Editor | null;
};

export default function ToolBar({ editor }: TToolBarProps) {
  if (!editor) return null;

  const headingOptions = [
    { label: "Normal", level: 0 },
    { label: "Heading 1", level: 1 },
    { label: "Heading 2", level: 2 },
    { label: "Heading 3", level: 3 },
    { label: "Heading 4", level: 4 },
    { label: "Heading 5", level: 5 },
    { label: "Heading 6", level: 6 },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 flex flex-wrap items-center gap-2">
      {/* Undo & Redo */}
      <div className="flex gap-0 md:gap-1">
        <Toggle
          size="sm"
          className="cursor-pointer"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          className="cursor-pointer"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="size-4" />
        </Toggle>
      </div>

      <span className="border-l mx-0 md:mx-2 h-5" />

      <div className="flex gap-0 md:gap-1">
        {/* Bold, Italic, Underline */}
        <Toggle
          size="sm"
          className="cursor-pointer"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          className="cursor-pointer"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          className="cursor-pointer"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="size-4" />
        </Toggle>
      </div>

      <span className="border-l mx-0 md:mx-2 h-5" />

      {/* Headings & Paragraph Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:right-0">
          <Button variant="outline">
            {headingOptions.find((h) =>
              editor.isActive("heading", { level: h.level })
            )?.label || "Normal"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {headingOptions.map((option) => (
            <DropdownMenuItem
              key={option.level}
              onClick={() =>
                option.level === 0
                  ? editor.chain().focus().setParagraph().run()
                  : editor
                      .chain()
                      .focus()
                      .toggleHeading({
                        level: option.level as 1 | 2 | 3 | 4 | 5 | 6,
                      })
                      .run()
              }
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <span className="border-l mx-0 md:mx-2 h-5" />

      {/* Bullet List & Number List */}
      <div className="flex gap-0 md:gap-1">
        <Toggle
          size="sm"
          className="cursor-pointer"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          className="cursor-pointer"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </Toggle>
      </div>
    </div>
  );
}
