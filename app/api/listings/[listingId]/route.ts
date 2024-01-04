import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import fs from "fs/promises";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing || listing.userId !== currentUser.id) {
    throw new Error("Listing not found or unauthorized access");
  }

  const listingDel = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  const imagePath = `public/upload/${listing?.imageSrc}`;

  try {
    await fs.unlink(imagePath);
  } catch (error) {
    throw new Error("Failed to delete image");
  }

  return NextResponse.json("Sucessfully Deleted");
}
