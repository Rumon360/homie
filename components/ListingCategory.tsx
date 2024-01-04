import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface ListingCategoryProps {
  icon: LucideIcon;
  label: string;
  description: string;
}

const ListingCategory: FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={35} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-sm text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
