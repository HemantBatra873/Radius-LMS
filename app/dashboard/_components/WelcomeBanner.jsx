"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="w-full p-5 px-8  rounded-lg flex items-center gap-6">
      <Image
        src={"/laptop.png"}
        alt="laptop"
        width={100}
        height={100}
        className="hidden md:block"
      />
      <div>
        <h2 className="text-3xl font-bold">Hello, {user?.fullName}</h2>
        <p>Welcome back, its time to get back and start learning new course</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
