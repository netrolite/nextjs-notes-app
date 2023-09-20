"use client";

import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import ResizeHandle from "./ResizeHandle";

interface TProps {
  children: ReactNode;
}

export default function SidebarResizableBoxProviders({ children }: TProps) {
  return (
    <ResizableBox
      width={400}
      axis="x"
      className="flex h-[100dvh]"
      maxConstraints={[500, 0]}
      minConstraints={[180, 0]}
      handle={<ResizeHandle />}
    >
      {children}
    </ResizableBox>
  );
}