import NotesContext from "@/contexts/NotesContext";
import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { noteRespSchema } from "@shared/respsSchemas";
import { useQuery } from "@tanstack/react-query";
import useGetContext from "../useGetContext";

export default function useNoteQuery() {
  const { selectedNote } = useGetContext(NotesContext);

  const query = useQuery(
    ["notes", selectedNote?._id],
    () => fetchNote(selectedNote?._id),
    { enabled: !!selectedNote },
  );

  return query;
}

async function fetchNote(noteId?: string) {
  const { data } = await httpWithAuth.get(`/notes/${noteId}`);
  return noteRespSchema.parse(data);
}
