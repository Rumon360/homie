"use client";

import { SafeUser } from "@/app/types";
import useFavorite from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { FC } from "react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorated, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <Heart
        size={24}
        className={cn(
          "text-white absolute -top-[2px] -right-[2px] fill-neutral-600/70",
          {
            "fill-rose-600": hasFavorated,
          }
        )}
      />
    </div>
  );
};

export default HeartButton;
