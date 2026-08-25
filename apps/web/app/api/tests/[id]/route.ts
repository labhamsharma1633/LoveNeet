import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { YAKEEN_CHEMISTRY_DPP1_QUESTIONS } from "@/lib/pdf-parser";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { TestModel } from "@/lib/models/Test";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let test = store.getTestById(id);

  if (!test && isMongoDBConfigured()) {
    try {
      await connectToDatabase();
      const dbTest = await TestModel.findOne({ id }).lean();
      if (dbTest) {
        test = dbTest as any;
      }
    } catch (e) {
      console.warn("MongoDB test lookup warning:", e);
    }
  }

  if (!test) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }

  let questions = test.questions;
  if (!questions || questions.length === 0) {
    if (test.id.includes("yakeen") || test.id.includes("chem") || test.title.includes("Chemistry")) {
      questions = YAKEEN_CHEMISTRY_DPP1_QUESTIONS;
    } else {
      questions = store.getQuestions().filter((q) => test.subjects.includes(q.subject));
      if (questions.length === 0) questions = store.getQuestions();
    }
  }

  return NextResponse.json({
    test: {
      ...test,
      totalQuestions: questions.length,
      totalMarks: questions.length * (test.positiveMarks || 4),
      questions
    }
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = store.updateTest(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, test: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = store.deleteTest(id);
  if (!success) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
