import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <Loader2 className="animate-spin text-primary" size={80} />
    </div>
  );
}
