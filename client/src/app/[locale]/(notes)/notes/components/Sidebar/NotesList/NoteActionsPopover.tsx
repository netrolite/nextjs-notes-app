import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import MoreIcon from "@/icons/svg/moreHorizontalCircled.svg";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import { NoteContext } from "./Note";
import PopoverActionBtn from "@/app/[locale]/(main)/auth/sign-in/components/PopoverActionBtn";
import useDeleteNoteMutation from "@/app/hooks/queries/useDeleteNoteMutation";

export default function NoteActionsPopover() {
  const t = useTranslations("Notes");
  const {
    isActionsPopoverOpen: isOpen,
    setIsActionsPopoverOpen: setIsOpen,
    _id,
  } = useGetContext(NoteContext);
  const { setSelectedNoteId } = useGetContext(NotesContext);
  const { mutate: deleteNote } = useDeleteNoteMutation();

  function handleAssignTag() {
    // TODO: impl this
  }

  function handleDelete() {
    deleteNote({ _id: _id as string });
    setSelectedNoteId(null);
  }

  return (
    <>
      <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
        <MoreIcon className="cursor-pointer" />
        <Popover
          noOverlay={true}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          position={"bottom-left"}
          offset={30}
          portalSelector="#popover-overlays"
          className="min-w-[160px] rounded border border-light-3xl-gray bg-light-5xl-gray px-2 py-1"
        >
          <PopoverActionBtn
            {...{ setIsPopoverMenuOpen: setIsOpen }}
            onClick={handleAssignTag}
          >
            {t("assignTag")}
          </PopoverActionBtn>
          <PopoverActionBtn
            {...{ setIsPopoverMenuOpen: setIsOpen }}
            onClick={handleDelete}
          >
            {t("delete")}
          </PopoverActionBtn>
        </Popover>
      </div>
    </>
  );
}
