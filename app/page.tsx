import EmptyState from "@/components/EmptyState";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import getListings, { IListings } from "./actions/getListings";
import ListingCard from "@/components/ListingCard";
import { getCurrentUser } from "./actions/getCurrentUser";
import { SafeListing } from "./types";

interface HomeParams {
  searchParams: IListings;
}

const Home = async ({ searchParams }: HomeParams) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) return <EmptyState />;

  return (
    <main>
      <MaxWidthWrapper>
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Home;
