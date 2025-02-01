import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

function TopicInput({ setTopic, setDifficultyLevel }) {
  return (
    <div className="text-left">
      <h1 className="mb-3">
        Enter the topic for which you would like to generate study material
      </h1>
      <Textarea
        placeholder="eg. Low level system design"
        onChange={(event) => setTopic(event.target.value)}
      />
      <h1 className="mb-3 mt-6">Select the difficulty level</h1>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-full bg-black ">
          {" "}
          {/* Set background & text color */}
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent className="bg-secondary ">
          {" "}
          {/* Ensure dropdown background is black */}
          <SelectItem
            value="beginner"
            className="bg-secondary  hover:bg-zinc-800"
          >
            Beginner
          </SelectItem>
          <SelectItem
            value="intermediate"
            className="bg-secondary  hover:bg-zinc-800"
          >
            Intermediate
          </SelectItem>
          <SelectItem
            value="advance"
            className="bg-secondary hover:bg-zinc-800"
          >
            Advance
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
