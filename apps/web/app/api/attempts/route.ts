import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { TestAttempt } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get("candidateId");

  if (!candidateId) {
    return NextResponse.json(
      { error: "candidateId parameter is required" },
      { status: 400 }
    );
  }

  const attempts = store.getAttemptsByCandidate(candidateId);
  return NextResponse.json({ attempts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, candidateId, candidateName } = body;

    if (!testId || !candidateId) {
      return NextResponse.json(
        { error: "testId and candidateId are required" },
        { status: 400 }
      );
    }

    const test = store.getTestById(testId);
    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Check if there is an active unsubmitted attempt for this test and candidate
    const existing = store
      .getAttemptsByCandidate(candidateId)
      .find((a) => a.testId === testId && !a.isSubmitted);

    if (existing) {
      return NextResponse.json({ attempt: existing, isResume: true });
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + test.durationMinutes * 60 * 1000);

    const attempt: TestAttempt = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      testId,
      candidateId,
      candidateName: candidateName || "Candidate",
      startTime: startTime.toISOString(),
      endTimeExpected: endTime.toISOString(),
      isSubmitted: false,
      durationMinutes: test.durationMinutes,
      responses: {},
      currentQuestionId: test.questions?.[0]?.id
    };

    store.createAttempt(attempt);
    return NextResponse.json({ attempt, isResume: false }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to start attempt" },
      { status: 500 }
    );
  }
}
