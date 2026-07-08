"use client";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChapterList from "./_components/ChapterList";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();

  //call the function inside useEffect so that anytime the page mounts we get the course Information
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=" + courseId);
      setCourse(result.data.result);
    } catch (error) {
      toast("Error fetching course information");
    }
  };

  return (
    <div>
      <div>
        {/* course Intro */}
        <CourseIntroCard course={course} />

        {/* study material Information */}
        <StudyMaterialSection courseId={courseId} course={course} />

        {/* Chapter list */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;
