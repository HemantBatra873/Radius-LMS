import React from "react";
import CourseHeader from "./_components/CourseHeader";

function layout({ children }) {
  return (
    <div>
      <CourseHeader />
      <div className="mx-10 md:mx-36 lg:mx-60 mt-10 mb-20 md:mb-28">
        {children}
      </div>
    </div>
  );
}

export default layout;
