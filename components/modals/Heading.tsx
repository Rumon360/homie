"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  titleBefore: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  titleBefore,
}) => {
  return (
    <div className={cn("", { "text-center": center })}>
      <div className="text-xl font-bold">
        {titleBefore} <span className="text-primary">{title}</span>
      </div>
      <div className="mt-1 font-light text-sm text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
