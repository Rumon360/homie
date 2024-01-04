"use client";

import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import useSearchModal from "@/hooks/useSearchModal";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "./Heading";
import DatePicker from "../ui/calendar";
import Counter from "../Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const { isOpen, toggle } = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onNext = () => {
    setSteps((val) => val + 1);
  };

  const onBack = () => {
    setSteps((val) => val - 1);
  };

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) return onNext();

    let currentQ = {};

    if (params) {
      currentQ = queryString.parse(params.toString());
    }

    const updatedQ: any = {
      ...currentQ,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQ.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQ.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQ,
      },
      { skipNull: true }
    );
    toggle();
    setSteps(STEPS.LOCATION);
    router.push(url);
  }, [
    bathroomCount,
    toggle,
    dateRange,
    location?.value,
    guestCount,
    roomCount,
    params,
    router,
    steps,
  ]);

  let bodyContent = (
    <>
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="Where do you wanna"
          title="go?"
          subtitle="Find the perfect location"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />
        <DialogFooter className="w-full">
          <Button onClick={onNext} className="w-full">
            Next
          </Button>
        </DialogFooter>
      </div>
    </>
  );

  if (steps === STEPS.DATE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-2">
          <Heading
            titleBefore="When do you want to"
            title="go?"
            subtitle="Make sure is everyone is free"
          />
          <DatePicker
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
          <DialogFooter className="flex gap-3 w-full">
            <Button
              variant={"outline"}
              onClick={onBack}
              className="w-full border-neutral-500"
            >
              Back
            </Button>
            <Button onClick={onNext} className="w-full">
              Next
            </Button>
          </DialogFooter>
        </div>
      </>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-6">
          <Heading
            titleBefore="More information"
            title="information"
            subtitle="Find your perfect place.."
          />
          <Counter
            title="Guests"
            subtitle="How many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
          <DialogFooter className="flex gap-3 w-full">
            <Button
              onClick={() => {
                onSubmit();
              }}
              className="w-full"
            >
              Search
            </Button>
          </DialogFooter>
        </div>
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader className="border-b-[1px] pb-4">
          <DialogTitle className="text-center">Search</DialogTitle>
        </DialogHeader>
        {bodyContent}
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
