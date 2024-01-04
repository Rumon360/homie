import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    bathroomCount,
    guestCount,
    location,
    price,
    roomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      bathroomCount,
      guestCount,
      price: parseInt(price, 10),
      roomCount,
      locationValue: location.value,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
