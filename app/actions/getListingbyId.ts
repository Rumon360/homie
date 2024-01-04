import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });
    if (!listing) return null;
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListingById;
