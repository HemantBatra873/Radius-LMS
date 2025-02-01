import { courseOutlineAiModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, courseType, topic, difficultyLevel, createdBy } =
    await req.json();

  const PROMPT =
    "Generate a study material for " +
    topic +
    " for " +
    courseType +
    " and level of difficulty will be " +
    difficultyLevel +
    " with summary of course , list of chapters along with summary of each chapter , topic list and notes of topic in each chapter . All in JSON format .";

  //generate the course with AI
  const AiResp = await courseOutlineAiModel.sendMessage(PROMPT);
  const AiResult = JSON.parse(AiResp.response.text());

  // Save the input along with the course
  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseId,
      courseType,
      topic,
      difficultyLevel,
      createdBy,
      courseLayout: AiResult,
    })
    .returning({ resp: STUDY_MATERIAL_TABLE });

  //trigger the inngest function to generate chapter notes
  const result = await inngest.send({
    name: "notes.generate",
    data: {
      course: dbResult[0].resp,
    },
  });

  return NextResponse.json({ result: dbResult[0] });
}
