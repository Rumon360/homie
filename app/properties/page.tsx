import { FC } from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import TripsClient from "@/components/TripsClient";
import getListings from "../actions/getListings";
import ListingCard from "@/components/ListingCard";
import { SafeListing } from "../types";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PropertiesClient from "@/components/PropertiesClient";

interface PropertiesProps {}

const Properties: FC<PropertiesProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
        showReset={false}
      />
    );

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no properties."
        showReset={false}
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default Properties;
