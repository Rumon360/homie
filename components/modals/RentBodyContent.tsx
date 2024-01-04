"use client";

import { FC } from "react";

interface RentBodyContentProps {
  bodyContent: React.ReactElement;
}

const RentBodyContent: FC<RentBodyContentProps> = ({ bodyContent }) => {
  return <>{bodyContent}</>;
};

export default RentBodyContent;
