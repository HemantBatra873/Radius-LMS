"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CourseHeader from "../course/[courseId]/_components/CourseHeader";

function Create() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  console.log(formData);

  const handleUserInput = (field, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: fieldValue,
    }));
  };

  //save user input and generate AI course layout

  const generateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    const result = await axios.post("/api/generate-course-outline", {
      courseId: courseId,
      ...formData,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    setLoading(false);
    router.replace("/dashboard");
    //show toast notification
    toast(
      "Your study material is being generated. Please click the refresh button to check for updates."
    );
  };

  return (
    <div>
      <CourseHeader />
      <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-5 md:mt-20 text-center">
        <h2 className="font-bold text-2xl md:text-4xl">
          Generate customized study materials based on your learning needs
        </h2>
        <p className="text-xl mt-2">
          Fill in all the details in order to generate learning material
        </p>

        <div className="mt-10 md:mt-20">
          {step == 0 ? (
            <SelectOption
              selectedStudyType={(value) =>
                handleUserInput("courseType", value)
              }
            />
          ) : (
            <TopicInput
              setTopic={(value) => handleUserInput("topic", value)}
              setDifficultyLevel={(value) =>
                handleUserInput("difficultyLevel", value)
              }
            />
          )}
        </div>

        <div className="mt-10 md:mt-32 flex justify-between w-full">
          {step != 0 ? (
            <Button variant="outline" onClick={() => setStep(0)}>
              Prev
            </Button>
          ) : (
            "-"
          )}
          {step == 0 ? (
            <Button onClick={() => setStep(1)}>Next</Button>
          ) : (
            <Button onClick={generateCourseOutline} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Generate"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
