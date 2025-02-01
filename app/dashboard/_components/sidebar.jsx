"use client";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

function SideBar() {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  const path = usePathname();
  return (
    <div className="h-screen shadow-md p-5">
      <Link href={"/"}>
        <Image src="/logos/logowword.svg" alt="logo" width={120} height={50} />
      </Link>

      <div className="mt-10">
        <Link className="w-full" href={"/create"}>
          <Button className="w-full">+ Create New</Button>
        </Link>

        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              className={`flex items-center gap-5 p-3 hover:bg-zinc-800 
                cursor-pointer rounded-md mt-3 ${
                  path == menu.path && "bg-zinc-800"
                }`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="border p-3 rounded-lg bg-zinc-800 absolute bottom-10">
        <h2 className="text-lg mb-2">Available Credits : {5 - totalCourse}</h2>
        <Progress value={(totalCourse / 5) * 100} />
        <h2 className="text-sm mt-1">{totalCourse} Out of 5 Credits Used</h2>
        <Link
          href={"/dashboard/upgrade"}
          className="text-sm text-blue-600 mt-3 hover:underline"
        >
          Upgrade to generate more
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
