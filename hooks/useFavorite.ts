import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { SafeUser } from "@/app/types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const { toast } = useToast();
  const { toggle } = useLoginModal();
  const hasFavorated = useMemo(() => {
    const lists = currentUser?.favoriteIds || [];
    return lists.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return toggle();
      try {
        let request;
        if (hasFavorated) {
          request = () => {
            return axios.delete(`/api/favorites/${listingId}`);
          };
        } else {
          request = () => {
            return axios.post(`/api/favorites/${listingId}`);
          };
        }

        await request();
        router.refresh();
        toast({
          variant: "success",
          title: "Success",
          description: hasFavorated
            ? "Sucessfully Removed Favorite"
            : "Successfully Favorated listing",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
    },
    [currentUser, hasFavorated, listingId, router, toast, toggle]
  );

  return {
    hasFavorated,
    toggleFavorite,
  };
};

export default useFavorite;
