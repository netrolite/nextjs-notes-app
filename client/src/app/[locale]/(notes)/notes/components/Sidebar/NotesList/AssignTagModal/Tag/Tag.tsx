import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import cn from "@/utils/cn";
import AssignTagModalUpdateAssignedTagsBtn from "./UpdateAssignedTagsBtn";

interface TProps {
  name: string;
  color: string;
  _id: string;
}

export default function AssignTagModalTag({ _id: tagId, color, name }: TProps) {
  return (
    <div className={cn("flex items-center justify-between")}>
      <div className={cn("flex gap-2")}>
        <div
          style={{ backgroundColor: color }}
          className="h-[30px] w-[30px] rounded"
        />
        <p className="leading-loose">{name}</p>
      </div>
      <div className={cn("flex gap-2")}>
        <AssignTagModalUpdateAssignedTagsBtn {...{ mode: "assign", tagId }} />
        <AssignTagModalUpdateAssignedTagsBtn {...{ mode: "unassign", tagId }} />
      </div>
    </div>
  );
}
