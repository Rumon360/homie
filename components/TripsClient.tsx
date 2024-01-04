"use client";

import { SafeReservation, SafeUser } from "@/app/types";
import { FC, useCallback, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Heading from "./modals/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import ListingCard from "./ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const { toast } = useToast();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast({
            variant: "success",
            title: "Reservation",
            description: "Reservation cancelled",
          });
          router.refresh();
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Reservation",
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
        title="Trips"
        subtitle="Where you've been and where you're going..."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default TripsClient;
