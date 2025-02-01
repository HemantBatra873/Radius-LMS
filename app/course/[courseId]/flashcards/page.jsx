"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Flashcards() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState();
  const [stepCount, setStepCount] = useState(-1);

  const getFlashcards = async () => {
    //fetch data from API
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Flashcards",
    });

    setFlashcards(result?.data);
  };
  useEffect(() => {
    getFlashcards();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setIsFlipped(false);
      setStepCount(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Flashcards</h2>
      <p>Helps you to remember concepts</p>
      <div className="flex gap-2 md:gap-5 items-center mt-5 ">
        {flashcards?.content &&
          flashcards?.content.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full md:rounded-lg
            ${stepCount < index ? "bg-zinc-800" : "bg-primary"}`}
            ></div>
          ))}
      </div>
      <div className="flex items-center justify-center mt-10 overflow-hidden">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcards?.content &&
              flashcards?.content.map((flashcard, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <FlashcardItem
                    handleClick={handleClick}
                    isFlipped={isFlipped}
                    flashcard={flashcard}
                  />
                  <div className="text-center mt-3 text-xs">
                    {index + 1} of {flashcards?.content?.length}
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Flashcards;
