import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = store.getResult(id);
  const attempt = store.getAttempt(id);

  if (!result) {
    return NextResponse.json({ error: "Result not found for this attempt" }, { status: 404 });
  }

  const test = attempt ? store.getTestById(attempt.testId) : undefined;

  return NextResponse.json({
    result,
    attempt,
    test
  });
}
