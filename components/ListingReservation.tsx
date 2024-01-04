"use client";

import { FC } from "react";
import { Range } from "react-date-range";
import { Button } from "./ui/button";
import DatePicker from "./ui/calendar";
import { Loader2 } from "lucide-react";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-lg font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4 w-full">
        <Button disabled={disabled} onClick={onSubmit} className="w-full">
          {disabled ? <Loader2 className="animate-spin" /> : "Reserve"}
        </Button>
      </div>

      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold">
        <div>Total </div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
