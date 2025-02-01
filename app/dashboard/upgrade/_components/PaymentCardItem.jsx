"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

const PaymentCardItem = ({ plan }) => {
  const OnCheckoutClick = async () => {
    const result = await axios.post("/api/payment/checkout", {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    });

    console.log(result.data);
    window.open(result.data?.url);
  };

  const OnPaymentManage = async () => {
    if (!userDetails?.customerId) {
      console.error("Customer ID is missing");
      console.log(userDetails);
      return;
    }
    const result = await axios.post("/api/payment/manage-payment", {
      customerId: userDetails?.customerId,
    });

    console.log(result.data);
    window.open(result.data?.url);
  };

  const [userDetails, setUserDetails] = useState();
  const { user } = useUser();
  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  // Fetch user details from the database
  const getUserDetails = async () => {
    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetails(result[0]);
  };
  return (
    <div className="border rounded-lg py-14 px-12  text-center w-full md:w-[370px]">
      <h3 className="text-xl font-bold mb-2">{plan.head}</h3>
      <h2 className="text-4xl font-semibold text-primary mb-4">
        ${plan.amount}
        <span className="text-sm font-extralight"> /month</span>
      </h2>
      <ul className="space-y-2 mb-5 text-left mt-7">
        {plan.features.map((feature, index) => (
          <li key={index} className="pb-2 flex gap-4">
            <Check />
            {feature}
          </li>
        ))}
      </ul>
      {plan.head == "Free Plan" ? (
        <h2 className="text-blue-600 p-2 px-4">Current plan</h2>
      ) : userDetails?.isMember == false ? (
        <Button
          className="text-primary bg-blue-600 hover:bg-blue-500"
          onClick={OnCheckoutClick}
        >
          Get started
        </Button>
      ) : (
        <Button
          className="text-primary bg-blue-600 hover:bg-blue-500"
          onClick={OnPaymentManage}
        >
          Manage Payment
        </Button>
      )}
    </div>
  );
};

export default PaymentCardItem;
