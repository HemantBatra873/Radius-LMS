import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_NAME,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {
  generateNotesAiModel,
  generateQaAiModel,
  generateQuizAiModel,
  generateStudyTypeContentAiModel,
} from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const createUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user/create" },
  async ({ event, step }) => {
    const result = await step.run(
      "Check user and create new if absent",
      async () => {
        //extract user data from event data
        const { user } = event.data;
        //check if the user already exists
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        //create new user
        if (result?.length == 0) {
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });

          return userResp;
        }

        return result;
      }
    );
    return "Success";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data; //All records

    //Generate notes for each chapter with AI
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      let index = 0;
      chapters.forEach(async (chapter) => {
        const PROMPT =
          "Generate detailed exam material for each chapter Make sure to include all topics provided in the content and give all content in HTML format but dont add HTML , Head , Body and title tag . The chapters :" +
          JSON.stringify(chapter);
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const AiResult = result.response.text();

        await db.insert(CHAPTER_NOTES_NAME).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: AiResult,
        });

        index++;
      });

      return "Completed successfully";
    });

    //update status to ready
    const updateCourseStatusResult = await step.run(
      "Update Course Status To Ready",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "ready",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

        return "success";
      }
    );
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const AiResult = await step.run(
      "Generating studyType using AI",
      async () => {
        const result =
          studyType == "Flashcards"
            ? await generateStudyTypeContentAiModel.sendMessage(prompt)
            : studyType == "Quiz"
            ? await generateQuizAiModel.sendMessage(prompt)
            : await generateQaAiModel.sendMessage(prompt);
        const AiResult = JSON.parse(result.response.text());
        return AiResult;
      }
    );

    //save the results
    const DbResult = await step.run("Save results to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AiResult,
          status: "Ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

      return "Succesfully inserted";
    });
  }
);
