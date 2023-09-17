import useSaveEditorContent from "@/app/hooks/queries/useSaveEditorContentQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext, { TNotesListNotesMeta } from "@/contexts/NotesContext";
import { SetState } from "@/utils/types";
import {
  EditorContent as TiptapEditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import styles from "./editor.module.css";

interface TProps {
  initContent: JSONContent | null;
}

export default function EditorContent({ initContent }: TProps) {
  const [content, setContent] = useState<null | JSONContent>(initContent);
  const { setNotes, selectedNoteId } = useGetContext(NotesContext);
  useSaveEditorContent(content);

  const editor = useEditor({
    content: initContent ?? "",
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      updateSelectedNoteProps(setNotes, selectedNoteId);
      setContent(editor.getJSON());
    },
  });

  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );
}

function updateSelectedNoteProps(
  setNotes: SetState<TNotesListNotesMeta>,
  selectedNoteId: string | null,
) {
  setNotes((prevNotes) => {
    if (!prevNotes || !selectedNoteId) return prevNotes;

    return prevNotes.map((note) => {
      if (note._id !== selectedNoteId) return note;
      note.updatedAt = new Date().toISOString();
      return note;
    });
  });
}
