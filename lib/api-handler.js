import { NextResponse } from "next/server";

export function withErrorHandler(handler) {
  return async (req, ...args) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error("API Error caught by middleware:", error);

      let status = 500;
      let message = "An internal server error occurred. Please try again.";

      const errMessage = error?.message?.toLowerCase() || "";

      if (
        error?.status === 503 ||
        errMessage.includes("503") ||
        errMessage.includes("high demand") ||
        errMessage.includes("unavailable") ||
        errMessage.includes("fetch failed") ||
        errMessage.includes("connect timeout error")
      ) {
        status = 503;
        message = "Service is currently experiencing high demand or is unreachable. Please try again later.";
      }

      return NextResponse.json({ error: message }, { status });
    }
  };
}
