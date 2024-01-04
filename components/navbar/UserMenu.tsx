"use client";

import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Loader2Icon, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const { toggle: registerToggle } = useRegisterModal();
  const { toggle: loginToggle } = useLoginModal();
  const { toggle: rentToggle } = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginToggle();
    }
    rentToggle();
  }, [currentUser, loginToggle, rentToggle]);

  return (
    <div className="flex gap-3 flex-row items-center pl-3 md:pl-0">
      <Button
        onClick={onRent}
        variant={"outline"}
        className="hidden md:block text-sm"
      >
        Homie your home
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <MenuIcon />
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currentUser ? (
            <>
              <DropdownMenuItem onClick={() => router.push("/trips")}>
                My trips
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/favorites")}>
                My favorites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/reservations")}>
                My Reservations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/properties")}>
                My Properties
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden" onClick={onRent}>
                Homie my home
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => loginToggle()}>
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => registerToggle()}>
                Sign up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
