import { FC } from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "@/components/TripsClient";

interface tripsProps {}

const Trips: FC<tripsProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
        showReset={false}
      />
    );

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips Found"
        subtitle="Looks like you haven't reserved any trips."
        showReset={false}
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default Trips;
