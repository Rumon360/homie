"use client";

import { SafeReservation, SafeUser } from "@/app/types";
import { FC, useCallback, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Heading from "./modals/Heading";
import ListingCard from "./ListingCard";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
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
        .catch(() => {
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
        title="Reservations"
        subtitle="your reservations..."
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
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default ReservationsClient;
