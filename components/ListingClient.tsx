"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "./navbar/Categories";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ListingHead from "./ListingHead";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2Icon } from "lucide-react";
import ListingCategory from "./ListingCategory";
import EmptyState from "./EmptyState";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

interface ListingClientProps {
  listing: SafeListing;
  currentUser: SafeUser | null;
  reservations?: SafeReservation[];
  hostname: string | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
  hostname,
}) => {
  const { toggle } = useLoginModal();
  const router = useRouter();
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { toast } = useToast();

  const onCreateReservation = useCallback(() => {
    if (!currentUser) toggle();
    setLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice: totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "Successfully created Reservation",
        });
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Something went wrong!",
        })
      )
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser, dateRange, toggle, listing.id, toast, totalPrice, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  if (!category) return <EmptyState />;

  return (
    <MaxWidthWrapper>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            currentUser={currentUser}
            id={listing?.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-6 mt-2">
            <div className="col-span-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold flex flex-row items-center gap-2">
                  <Avatar className="w-[30px] h-[30px]">
                    <AvatarImage
                      src={
                        currentUser?.image
                          ? currentUser?.image
                          : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
                      }
                    />
                    <AvatarFallback>
                      <Loader2Icon className="animate-spin w-5 h-5 text-neutral-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>Hosted by {hostname}</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 text-neutral-500">
                <div>{listing.guestCount} guests</div>
                <div>{listing.roomCount} rooms</div>
                <div>{listing.bathroomCount} bathrooms</div>
              </div>
              <hr />
              {listing.category && (
                <ListingCategory
                  icon={category?.icon}
                  label={category?.label}
                  description={category?.description}
                />
              )}
              <hr />
              <div className="text-sm text-neutral-500">
                {listing.description}
              </div>
            </div>
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={loading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ListingClient;
