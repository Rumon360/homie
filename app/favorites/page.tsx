import { FC } from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "@/components/ReservationsClient";
import getFavorites from "../actions/getFavorites";

import ListingCard from "@/components/ListingCard";
import { SafeListing } from "../types";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
        showReset={false}
      />
    );

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subtitle="Looks like you don't have any favorites."
        showReset={false}
      />
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((listing: SafeListing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Favorites;
