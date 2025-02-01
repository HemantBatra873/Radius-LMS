import React from "react";

function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters;
  return (
    <div className="mt-5">
      <h2 className="font-medium text-2xl">Chapters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        {CHAPTERS?.map((chapter, index) => (
          <div
            key={index}
            className="flex gap-3 mt-4 border p-5 rounded-lg cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{index + 1}.</h2>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">
                {chapter?.chapter_title}
              </h2>
              <p className="text-lg">{chapter?.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
