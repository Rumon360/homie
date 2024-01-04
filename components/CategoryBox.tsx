"use client";

import React, { useCallback } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  description: string;
  icon: LucideIcon;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQ = {};

    if (params) {
      currentQ = qs.parse(params.toString());
    }

    const updatedQ: any = { ...currentQ, category: label };

    if (params?.get("category") === label) {
      delete updatedQ.category;
    }

    const url = qs.stringifyUrl(
      { url: "/", query: updatedQ },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <Button
      size={"sm"}
      onClick={handleClick}
      variant={"outline"}
      className={cn("", {
        "border-primary border-[2px]": selected,
      })}
    >
      <Icon
        size={18}
        className={cn("text-neutral-500", { "text-primary": selected })}
      />
      <span className="ml-1 text-sm">{label}</span>
    </Button>
  );
};

export default CategoryBox;
