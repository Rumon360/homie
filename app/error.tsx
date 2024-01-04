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
      <EmptyState
        showReset={false}
        title="Something Went Wrong"
        subtitle="Please reload the page or try again later."
      />
    </div>
  );
}
