import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseCardItem({ course }) {
  return (
    <div className="border rounded-lg p-5">
      <div>
        <div className="flex justify-between items-center">
          <Image
            src={"/knowledge.png"}
            alt={course.topic}
            width={50}
            height={50}
          />
          <h2 className="text-xs font-semibold p-1 px-2 rounded-lg bg-primary text-secondary">
            24 Dec 2024
          </h2>
        </div>
        <h2 className="mt-3 text-lg font-medium line-clamp-2 leading-relaxed min-h-[3.5rem]">
          {course?.courseLayout?.course_name}
        </h2>
        <p className="text-sm line-clamp-2 text-zinc-400 mt-1">
          {course?.courseLayout?.summary}
        </p>

        <div className="mt-3">
          <Progress value={40} />
        </div>

        <div className="mt-3 flex justify-end">
          {course?.status == "Generating" ? (
            <Button disabled={true} className="flex gap-2 items-center">
              <h2>Generating</h2>
              <RefreshCcw className="animate-spin" />
            </Button>
          ) : (
            <Link href={"/course/" + course?.courseId}>
              <Button>View </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
