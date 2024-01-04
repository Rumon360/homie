import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute flex flex-col justify-center items-center p-6 rounded-lg left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] border">
      <h2 className="text-xl font-semibold text-primary text-center">
        Not Found
      </h2>
      <p className="text-neutral-500 text-lg text-center mt-2">
        Could not find requested resource
      </p>
      <Link href="/">
        <Button variant={"link"}>Return Home</Button>
      </Link>
    </div>
  );
}
