import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    const favorites = await prisma.listing.findMany({
      where: { id: { in: [...(user.favoriteIds || [])] } },
    });

    const safeFavorites = favorites.map((favorite) => {
      return { ...favorite, createdAt: favorite.createdAt.toISOString() };
    });

    return safeFavorites;
  } catch (error) {
    throw new Error("Error");
  }
}
