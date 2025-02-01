import React from "react";
import ReactCardFlip from "react-card-flip";

function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="font-semibold text-lg md:text-xl text-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-4 bg-primary text-secondary flex items-center justify-center
        rounded-lg cursor-pointer h-[470px] w-[265px] md:h-[550px] md:w-[350px] "
          onClick={handleClick}
        >
          {flashcard?.front}
        </div>

        <div
          className="p-4 border flex items-center justify-center
        rounded-lg cursor-pointer h-[470px] w-[265px] md:h-[550px] md:w-[350px] "
          onClick={handleClick}
        >
          {flashcard?.back}
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashcardItem;
