"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./modals/Heading";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset = true,
}) => {
  const router = useRouter();

  return (
    <div className="pt-20 h-[60vh] relative flex flex-col gap-2 justify-center items-center">
      <Heading titleBefore={title} title="" subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
