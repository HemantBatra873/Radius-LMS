import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, chapters, type } = await req.json();
  const PROMPT =
    type == "Flashcards"
      ? "Generate flashcards for" +
        chapters +
        "in JSON in front and back format . Generate a maximum of 15 flashcards."
      : type == "Quiz"
      ? "Generate Quiz on the topic" +
        chapters +
        " with questions and options along with correct answer in JSON format"
      : "Generate questions and answers for the topic" +
        chapters +
        " in JSON format . (Max 10)";

  //Insert record to DB set status as generating
  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId,
      type,
      status: "generating",
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  //Trigger Inngest Function
  const res = await inngest.send({
    name: "studyType.content",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json(result[0].id);
}
