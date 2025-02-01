import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 justify-between md:justify-end flex items-center">
      <Link href={"/"}>
        <Image
          src="/logos/logowword.svg"
          alt="logo"
          width={120}
          height={50}
          className="block md:hidden"
        />
      </Link>
      <div className="flex gap-2 md:gap-4 items-center">
        <Link
          href={"/create"}
          className="p-1 px-3 block md:hidden rounded-md font-medium border border-primary text-sm md:text-base hover:bg-zinc-800"
        >
          Create new
        </Link>
        <div className="h-9 w-9 flex items-center">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
