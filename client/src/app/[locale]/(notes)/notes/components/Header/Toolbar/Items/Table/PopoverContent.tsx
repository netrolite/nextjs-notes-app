import useGetContext from "@/app/hooks/useGetContext";
import useSelectionIncludesMark from "@/app/hooks/useSelectionIncludesMark";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import Divider from "../FormatText/Formatting/Divider";
import HoverableItem from "../HoverableItem";
import { TableContext } from "./Context";
import TableMenuSection from "./Section";
import AddIcon from "@/icons/svg/add.svg";
import DeleteIcon from "@/icons/svg/delete.svg";
import useIsSelectionInsideTable from "@/app/[locale]/(notes)/notes/components/Header/Toolbar/Items/Table/useIsSelectionInsideTable";

export default function TablePopoverContent() {
  const t = useTranslations("Toolbar.table");
  const { editor } = useGetContext(NotesContext);
  const { isMenuOpen } = useGetContext(TableContext);
  const selectionIncludesTable = useIsSelectionInsideTable({
    isMenuOpen,
  });

  const isAddTableDisabled =
    selectionIncludesTable ||
    !editor?.can().chain().insertTable({ withHeaderRow: false }).run();
  const isDeleteTableDisabled = !editor?.can().chain().deleteTable().run();

  const isAddRowAboveDisabled = !editor?.can().chain().addRowBefore().run();
  const isAddRowBelowDisabled = !editor?.can().chain().addRowAfter().run();
  const isDeleteRowDisabled = !editor?.can().chain().deleteRow().run();

  const isAddColToLeftDisabled = !editor?.can().chain().addColumnBefore().run();
  const isAddColToRightDisabled = !editor?.can().chain().addColumnAfter().run();
  const isDeleteColDisabled = !editor?.can().chain().deleteColumn().run();

  function addRowAbove() {
    editor?.chain().addRowBefore().focus().run();
  }

  function addRowBelow() {
    editor?.chain().addRowAfter().focus().run();
  }

  function addColToLeft() {
    editor?.chain().addColumnBefore().focus().run();
  }

  function addColToRight() {
    editor?.chain().addColumnAfter().focus().run();
  }

  const addTable = () =>
    editor?.chain().insertTable({ withHeaderRow: false }).focus().run();
  const deleteTable = () => editor?.chain().deleteTable().focus().run();
  const deleteRow = () => editor?.chain().deleteRow().focus().run();
  const deleteCol = () => editor?.chain().deleteColumn().focus().run();

  return (
    <div className="flex flex-col gap-2">
      <TableMenuSection>
        <HoverableItem
          text={t("addTable")}
          onClick={addTable}
          isDisabled={isAddTableDisabled}
          icon={<AddIcon />}
        />
        <HoverableItem
          text={t("deleteTable")}
          onClick={deleteTable}
          isDisabled={isDeleteTableDisabled}
          icon={<DeleteIcon />}
        />
      </TableMenuSection>
      <Divider />
      <TableMenuSection title={t("rows")}>
        <HoverableItem
          text={t("addRowAbove")}
          onClick={addRowAbove}
          isDisabled={isAddRowAboveDisabled}
        />
        <HoverableItem
          text={t("addRowBelow")}
          onClick={addRowBelow}
          isDisabled={isAddRowBelowDisabled}
        />
        <HoverableItem
          text={t("deleteRow")}
          onClick={deleteRow}
          isDisabled={isDeleteRowDisabled}
        />
      </TableMenuSection>
      <TableMenuSection title={t("cols")}>
        <HoverableItem
          text={t("addColToLeft")}
          onClick={addColToLeft}
          isDisabled={isAddColToLeftDisabled}
        />
        <HoverableItem
          text={t("addColToRight")}
          onClick={addColToRight}
          isDisabled={isAddColToRightDisabled}
        />
        <HoverableItem
          text={t("deleteCol")}
          onClick={deleteCol}
          isDisabled={isDeleteColDisabled}
        />
      </TableMenuSection>
    </div>
  );
}
