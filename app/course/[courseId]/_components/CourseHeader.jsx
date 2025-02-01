import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseHeader() {
  return (
    <div className="p-5 justify-between flex">
      <Link href={"/"}>
        <Image src="/logos/logowword.svg" alt="logo" width={120} height={50} />
      </Link>
      <div className="flex gap-2 md:gap-4 items-center">
        <Link
          href={"/dashboard"}
          className="p-1 px-3 rounded-md font-medium border border-primary text-sm md:text-base hover:bg-zinc-800"
        >
          Dashboard
        </Link>
        <div className="h-8 w-8 md:h-9 md:w-9">
          <UserButton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;
