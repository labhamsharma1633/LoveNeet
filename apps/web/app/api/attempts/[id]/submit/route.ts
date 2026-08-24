import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));

    // If candidate sends final batch of responses before submitting
    if (body.responses) {
      store.updateAttemptResponses(id, body.responses);
    }

    const result = store.submitAttempt(id, body.testId);
    if (!result) {
      return NextResponse.json(
        { error: "Could not evaluate test attempt. Invalid ID or missing questions." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Submission failed" }, { status: 500 });
  }
}
