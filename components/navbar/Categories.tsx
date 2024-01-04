"use client";

import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Castle,
  Droplets,
  Fan,
  Fish,
  FlameKindling,
  Gem,
  Home,
  Mountain,
  MountainSnow,
  Palmtree,
  Snowflake,
  Sun,
  Tractor,
  Warehouse,
  Wind,
} from "lucide-react";
import CategoryBox from "../CategoryBox";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: Sun,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: Fan,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: Home,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: Mountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: Droplets,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: Palmtree,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: Fish,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: Snowflake,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: Castle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: Warehouse,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: FlameKindling,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: MountainSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: Wind,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: Tractor,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: Gem,
    description: "This property is brand new and luxurious!",
  },
];

function Categories() {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <MaxWidthWrapper>
      <ScrollArea>
        <div className="py-4 flex gap-3 flex-row items-center justify-center">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              description={item.description}
              selected={category === item.label ? true : false}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </MaxWidthWrapper>
  );
}

export default Categories;
