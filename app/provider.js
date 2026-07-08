"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

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
    try {
      const result = await axios.post("/api/create-user", { user: user });
      console.log(result.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to create/check user");
    }
  };
  return <div>{children}</div>;
}

export default provider;
