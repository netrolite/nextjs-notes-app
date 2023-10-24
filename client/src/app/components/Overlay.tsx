"use client";
import NotesContext from "@/contexts/NotesContext";
import { SetState } from "@/utils/types";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import useGetContext from "../hooks/useGetContext";
import useQuerySelector from "../hooks/useQuerySelector";

interface TProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  setIsActive?: SetState<boolean>;
  transparent?: boolean;
  children?: ReactNode;
}

export default function Overlay({
  isActive,
  setIsActive,
  transparent = false,
  children,
  ...attributes
}: TProps) {
  const portalContainer = useQuerySelector("#popover-overlays");
  const { editor } = useGetContext(NotesContext);
  if (!portalContainer) return null;

  return ReactDom.createPortal(
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-10 ${
        transparent ? "bg-transparent" : "bg-black/70"
      } ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={
        setIsActive
          ? () => {
              editor?.commands.focus();
              setIsActive(false);
            }
          : undefined
      }
      {...attributes}
    >
      {children}
    </div>,
    portalContainer,
  );
}
