import { FC } from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "@/components/ReservationsClient";

interface ReservationsProps {}

const Reservations: FC<ReservationsProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
        showReset={false}
      />
    );

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservation Found"
        subtitle="Looks like you don't have any reservations."
        showReset={false}
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default Reservations;
