import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="fixed w-full bg-white shadow-sm z-[10]">
      <div className="py-4 border-b-[1px]">
        <MaxWidthWrapper>
          <div className="flex flex-row justify-between items-center gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </MaxWidthWrapper>
      </div>
      <Categories />
    </header>
  );
};

export default Navbar;
