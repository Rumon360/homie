import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div className="text-primary font-semibold text-lg uppercase">
      <Link href={"/"} className="flex cursor-pointer items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[50px] rotate-45"
          viewBox="0 0 550.000000 361.000000"
        >
          <g
            transform="translate(0.000000,361.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M1976 2349 c-383 -381 -696 -697 -696 -703 0 -14 1381 -1396 1395
-1396 13 0 1395 1382 1395 1395 0 11 -1381 1395 -1391 1395 -4 0 -320 -311
-703 -691z m1024 -1024 c-173 -173 -319 -315 -325 -315 -6 0 -152 142 -325
315 l-315 315 640 0 640 0 -315 -315z"
            />
          </g>
        </svg>
        <span className="-translate-x-[20%] ">Homie</span>
      </Link>
    </div>
  );
}

export default Logo;
