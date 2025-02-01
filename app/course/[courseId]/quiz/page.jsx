"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuizCardItem from "./_components/QuizCardItem";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

function Quiz() {
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState();
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(-1);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const router = useRouter();

  const getQuiz = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Quiz",
    });

    setQuizData(result.data);
    setQuiz(result.data?.content?.questions);
  };

  const checkAnswer = (userAnswer, quiz) => {
    if (userAnswer == quiz?.correctAnswer) {
      setCorrectAnswer(true);
      return;
    }
    setCorrectAnswer(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);
  return (
    quiz && (
      <div>
        <h2 className="font-bold text-2xl">Quiz</h2>
        <p>Test your learning.</p>
        <div className="flex gap-2 md:gap-5 items-center mt-5">
          {stepCount == -1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowLeftIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStepCount(stepCount - 1);
                setCorrectAnswer(null);
              }}
            >
              <ArrowLeftIcon />
            </Button>
          )}

          {quiz?.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full md:rounded-lg
            ${stepCount < index ? "bg-zinc-800" : "bg-primary"}`}
            ></div>
          ))}
          {stepCount == quiz?.length - 1 ? (
            <Button disabled={true} variant="outline" size="sm">
              <ArrowRightIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStepCount(stepCount + 1);
                setCorrectAnswer(null);
              }}
            >
              <ArrowRightIcon />
            </Button>
          )}
        </div>
        <div>
          <QuizCardItem
            quiz={quiz[stepCount + 1]}
            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount + 1])}
          />
        </div>
        {correctAnswer == true && (
          <div className="border p-3 px-5 rounded-lg border-green-700 bg-green-300 mt-4">
            <h2 className="font-bold text-lg text-green-600">Correct Answer</h2>
            <p className="text-green-600">Your answer is correct</p>
          </div>
        )}
        {correctAnswer == false && (
          <div className="border p-3 px-5 rounded-lg border-red-700 bg-red-300 mt-4">
            <h2 className="font-bold text-lg text-red-600">Incorrect Answer</h2>
            <p className="text-red-600">Try again</p>
          </div>
        )}
        {stepCount == quiz.length - 1 && (
          <div className="flex flex-col justify-center items-center mt-14 gap-2">
            <h2 className="text-center">
              Congratulations! 🎉 You have successfully completed this section
            </h2>
            <Button onClick={() => router.back()}>Back to Course</Button>
          </div>
        )}
      </div>
    )
  );
}

export default Quiz;
