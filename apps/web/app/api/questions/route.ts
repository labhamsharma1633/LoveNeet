import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { Question } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "draft" | "approved" | "all"

  if (type === "draft") {
    return NextResponse.json({ questions: store.getDraftQuestions() });
  }

  if (type === "approved") {
    return NextResponse.json({ questions: store.getQuestions() });
  }

  return NextResponse.json({
    approved: store.getQuestions(),
    drafts: store.getDraftQuestions()
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
    }

    const updated = store.updateDraftQuestion(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, question: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, questionIds } = body;

    if (action === "approve") {
      if (!Array.isArray(questionIds) || questionIds.length === 0) {
        return NextResponse.json(
          { error: "questionIds array is required" },
          { status: 400 }
        );
      }
      const approved = store.approveDraftQuestions(questionIds);
      return NextResponse.json({ success: true, approvedCount: approved.length });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
