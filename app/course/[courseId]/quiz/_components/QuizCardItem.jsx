"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-5 md:mt-14 p-5">
      <h2 className="font-medium text-2xl md:text-3xl">{quiz?.question}</h2>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {quiz?.options?.map((option, index) => (
          <h2
            onClick={() => {
              setSelectedOption(option);
              userSelectedOption(option);
            }}
            key={index}
            className={`w-full text-lg font-normal text-center border p-1
             rounded-xl hover:bg-zinc-800 cursor-pointer
             ${
               selectedOption === option &&
               "bg-primary text-secondary hover:bg-primary"
             }`}
          >
            {option}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default QuizCardItem;
