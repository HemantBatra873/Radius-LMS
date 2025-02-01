"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState();
  const [stepCount, setStepCount] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "notes",
    });

    setNotes(result?.data);
  };

  return (
    notes && (
      <div>
        <h2 className="font-bold text-2xl">Notes</h2>
        <p>Prepare to ace.</p>
        <div className="flex gap-2 md:gap-5 items-center mt-5">
          {stepCount == -1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowLeftIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStepCount(stepCount - 1)}
            >
              <ArrowLeftIcon />
            </Button>
          )}

          {notes?.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-lg
            ${stepCount < index ? "bg-zinc-800" : "bg-primary"}`}
            ></div>
          ))}
          {stepCount == notes?.length - 1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowRightIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStepCount(stepCount + 1)}
            >
              <ArrowRightIcon />
            </Button>
          )}
        </div>
        <div className="mt-10">
          <div
            className="prose max-w-none text-primary"
            dangerouslySetInnerHTML={{
              __html: notes[stepCount + 1]?.notes
                ?.replace("```html", "")
                ?.replace("```", ""),
            }}
          />

          {stepCount == notes.length - 1 && (
            <div className="flex flex-col justify-center items-center mt-48 gap-2">
              <h2 className="text-center">
                Congratulations! 🎉 You have successfully completed this section
              </h2>
              <Button onClick={() => router.back()}>Back to Course</Button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ViewNotes;
