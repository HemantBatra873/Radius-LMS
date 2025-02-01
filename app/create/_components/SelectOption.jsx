"use client";
import Image from "next/image";
import React, { useState } from "react";

function SelectOption({ selectedStudyType }) {
  const options = [
    {
      name: "Exam",
      icon: "/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h1 className="mb-5 text-center text-lg">
        What would you like to create the study material for?
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 items-center justify-center p-4 border
             rounded-lg hover:border-primary cursor-pointer
             ${
               option?.name === selectedOption
                 ? "border-primary"
                 : "border-zinc-800"
             }`}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name);
            }}
          >
            <Image src={option.icon} alt="option.name" width={50} height={50} />
            <h2>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;
