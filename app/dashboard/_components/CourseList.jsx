"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  // Fetch all courses created by the current user
  const GetCourseList = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    setCourseList(result.data.result);
    setLoading(false);
    setTotalCourse(result.data.result?.length);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Study Material</h1>
        <Button variant="outline" onClick={GetCourseList}>
          <RefreshCcw />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 md:mt-10 gap-5 md:gap-10">
        {loading == false
          ? courseList?.map((course, index) => (
              <CourseCardItem key={index} course={course} />
            ))
          : [1, 2, 3, 4, 5, 6].map((course, index) => (
              <div
                key={index}
                className="h-60 w-full animate-pulse bg-zinc-800 rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default CourseList;
