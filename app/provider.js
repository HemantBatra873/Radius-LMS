"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function provider({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && CheckIsNewUser();
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [user, isSignedIn, isLoaded]);

  const CheckIsNewUser = async () => {
    const result = await axios.post("/api/create-user", { user: user });
    console.log(result.data);
  };
  return <div>{children}</div>;
}

export default provider;
