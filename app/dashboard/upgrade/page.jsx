import React from "react";
import PaymentCardItem from "./_components/PaymentCardItem";

function Upgrade() {
  const plans = [
    {
      head: "Free Plan",
      amount: "0",
      features: [
        "5 Credits",
        "Limited Support",
        "Email Support",
        "15 Days Money Back Policy",
      ],
    },
    {
      head: "Paid Plan",
      amount: "9.99",
      features: [
        "Unlimited Credits",
        "Unlimited Flashcards & Quizzes",
        "Email Support",
        "15 Days Money Back Policy",
      ],
    },
  ];
  return (
    <div>
      <h2 className="font-bold text-2xl">Plans</h2>
      <p>Upgrade to get unlimited tokens.</p>
      <div className="flex flex-col lg:flex-row gap-7 md:gap-14 mt-10 md:mt-20 items-center justify-center">
        {plans.map((plan, index) => (
          <PaymentCardItem key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}
export default Upgrade;
