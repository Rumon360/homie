"use client";

import EmptyState from "@/components/EmptyState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <EmptyState />
    </div>
  );
}
