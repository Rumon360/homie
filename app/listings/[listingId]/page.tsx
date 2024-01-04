import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingbyId";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;

  return (
    <main>
      <ListingClient
        listing={listing}
        hostname={listing.user.name}
        reservations={reservations}
        currentUser={currentUser}
      />
    </main>
  );
}
