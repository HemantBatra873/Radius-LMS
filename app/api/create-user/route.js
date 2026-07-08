import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api-handler";

export const POST = withErrorHandler(async (req) => {
  const { user } = await req.json();
  const result = await inngest.send({
    name: "user/create",
    data: {
      user: user,
    },
  });
  return NextResponse.json({ result: result });
});
