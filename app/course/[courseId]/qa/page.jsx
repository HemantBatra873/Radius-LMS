"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QaCardItem from "./_components/QaCardItem";

function Qa() {
  const { courseId } = useParams();
  const [qa, setQa] = useState([]);
  const [stepCount, setStepCount] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    getQa();
  }, []);

  // Fetch quiz data from the API
  const getQa = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "QnA",
    });

    setQa(result.data?.content?.questions);
    console.log(result.data);
  };

  return (
    qa && (
      <div>
        <h2 className="font-bold text-2xl">Question Answers</h2>
        <p>Practice popular questions.</p>
        <div className="flex gap-2 md:gap-5 items-center mt-5">
          {stepCount == -1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowLeftIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStepCount(stepCount - 1);
              }}
            >
              <ArrowLeftIcon />
            </Button>
          )}

          {qa?.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full md:rounded-lg
            ${stepCount < index ? "bg-zinc-800" : "bg-primary"}`}
            ></div>
          ))}
          {stepCount == qa?.length - 1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowRightIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStepCount(stepCount + 1);
              }}
            >
              <ArrowRightIcon />
            </Button>
          )}
        </div>

        <div>
          <QaCardItem qa={qa[stepCount + 1]} />
        </div>

        {stepCount == qa.length - 1 && (
          <div className="flex flex-col justify-center items-center mt-14 gap-2">
            <h2 className="text-center">
              Congratulations! 🎉 You have successfully completed this section
            </h2>
            <Button onClick={() => router.back()}>Back to Course</Button>
          </div>
        )}
      </div>
    )
  );
}

export default Qa;
