import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

function CourseIntroCard({ course }) {
  return (
    <div className="flex gap-5 items-center p-5 md:p-10 border rounded-lg">
      <Image
        src={"/knowledge.png"}
        alt="book"
        width={90}
        height={90}
        className="hidden md:block"
      />
      <div>
        <h2 className="font-bold text-2xl">
          {course?.courseLayout?.course_name}
        </h2>
        <p className="mt-3">{course?.courseLayout?.summary}</p>
        <Progress className="mt-3" value="40" />
        <h2 className="mt-3 text-lg ">
          Total Chapter : {course?.courseLayout?.chapters?.length}
        </h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;
