"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useCountries from "@/hooks/useCountries";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  listing?: SafeListing;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square  w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            sizes=""
            alt="listing"
            src={data.imageSrc}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="font-semibold text-lg mt-2 leading-[1.3]">
        {location?.region}, {location?.label}
      </div>
      <div className="text-neutral-500 text-sm mt-1">
        {reservationDate || data.category}
      </div>
      <div className="flex flex-row gap-1 items-center mt-1">
        <div className="font-semibold">${price}</div>
        {!reservation && (
          <div className="text-neutral-500 text-sm">/ Night</div>
        )}
      </div>

      {actionLabel && actionLabel && (
        <Button
          onClick={handleCancel}
          disabled={disabled}
          variant={"destructive"}
          className="w-full mt-1"
        >
          {disabled ? <Loader2 className="animate-spin" /> : actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ListingCard;
