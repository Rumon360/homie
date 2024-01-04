"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <Button
      type="button"
      onClick={() => {
        onClick(label);
      }}
      variant={"outline"}
      size={"sm"}
      className={cn("w-full", { "border-primary": selected })}
    >
      {label}
    </Button>
  );
};

export default CategoryInput;
