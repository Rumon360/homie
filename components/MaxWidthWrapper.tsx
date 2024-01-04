// "use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "xl:max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
