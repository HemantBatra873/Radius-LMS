import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api-handler";

export const POST = withErrorHandler(async (req) => {
  const { createdBy } = await req.json();
  const result = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
    .orderBy(desc(STUDY_MATERIAL_TABLE.id));

  return NextResponse.json({ result: result });
});

export const GET = withErrorHandler(async (req) => {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const courseId = searchParams?.get("courseId");

  const courses = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

  return NextResponse.json({ result: courses[0] });
});
