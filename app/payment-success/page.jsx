import React from "react";
import CourseHeader from "../course/[courseId]/_components/CourseHeader";
import Link from "next/link";
import { ArrowRightCircle, CheckCircleIcon, MoveRight } from "lucide-react";

function PaymentSuccessful() {
  return (
    <div>
      <CourseHeader />
      <div className="flex flex-col items-center justify-center mt-44 md:mt-60 text-center p-5">
        <h1 className="text-3xl md:text-5xl font-bold flex gap-3 items-center">
          Payment Successful <CheckCircleIcon className="md:h-10 md:w-10" />
        </h1>
        <p className="text-sm md:text-lg mt-2 ">
          Thank you for your purchase! Your transaction was successful.
        </p>
        <Link
          href="/dashboard"
          className=" px-6 py-2 text-blue-600 flex gap-2 hover:text-blue-500"
        >
          Go to Dashboard <MoveRight />
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccessful;
