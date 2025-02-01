import { db } from "@/configs/db";
import { CHAPTER_NOTES_NAME, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();
  if (studyType == "ALL") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_NAME)
      .where(eq(CHAPTER_NOTES_NAME.courseId, courseId));

    // Get all other study types
    const contentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const result = {
      notes,
      flashcard: contentList?.find((item) => item.type == "Flashcards") ?? null,
      quiz: contentList?.find((item) => item.type == "Quiz") ?? null,
      qa: contentList?.find((item) => item.type == "QnA") ?? null,
    };

    return NextResponse.json(result);
  }

  if (studyType == "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_NAME)
      .where(eq(CHAPTER_NOTES_NAME.courseId, courseId));

    return NextResponse.json(notes);
  } else {
    const material = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
        )
      );

    return NextResponse.json(material[0] ?? []);
  }
}
