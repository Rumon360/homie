"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { FC, useCallback, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Heading from "./modals/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import ListingCard from "./ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const { toast } = useToast();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast({
            variant: "success",
            title: "Listing",
            description: "Listing deleted",
          });
          router.refresh();
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Listing",
            description: "Something went wrong...",
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router, toast]
  );

  return (
    <MaxWidthWrapper>
      <Heading
        titleBefore="My"
        title="Properties"
        subtitle="Listing of your properties..."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            listing={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete"
            currentUser={currentUser}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default PropertiesClient;
