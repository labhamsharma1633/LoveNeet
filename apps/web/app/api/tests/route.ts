import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { TestConfig } from "@/lib/types";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { TestModel } from "@/lib/models/Test";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "draft" | "published" | "archived" | null;
  const role = searchParams.get("role");

  let tests = store.getTests();

  // If MongoDB is configured, merge database tests
  if (isMongoDBConfigured()) {
    try {
      await connectToDatabase();
      const dbTests = await TestModel.find({}).lean();
      if (dbTests && dbTests.length > 0) {
        const memIds = new Set(tests.map((t) => t.id));
        for (const dbt of dbTests) {
          if (!memIds.has(dbt.id)) {
            tests.unshift(dbt as unknown as TestConfig);
          }
        }
      }
    } catch (e) {
      console.warn("MongoDB test fetch warning:", e);
    }
  }

  if (role === "admin" && status) {
    tests = tests.filter((t) => t.status === status);
  } else {
    // Return all tests that are not explicitly archived
    tests = tests.filter((t) => t.status !== "archived");
  }

  return NextResponse.json({ tests });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      code,
      description,
      durationMinutes,
      positiveMarks,
      negativeMarks,
      passingMarks,
      subjects,
      questionIds,
      instructions,
      pattern
    } = body;

    if (!title || !code || !durationMinutes) {
      return NextResponse.json(
        { error: "Title, Code, and Duration are required." },
        { status: 400 }
      );
    }

    const allQuestions = store.getQuestions();
    const selectedQuestions = questionIds
      ? allQuestions.filter((q) => questionIds.includes(q.id))
      : allQuestions;

    const newTest: TestConfig = {
      id: `test-${Date.now()}`,
      title,
      code,
      description: description || "Comprehensive NEET practice examination.",
      instructions: instructions || [
        `Duration: ${durationMinutes} minutes.`,
        `Marking Scheme: +${positiveMarks || 4} for correct, -${negativeMarks || 1} for incorrect.`,
        "Do not switch browser tabs during the examination."
      ],
      totalQuestions: selectedQuestions.length,
      totalMarks: selectedQuestions.length * (positiveMarks || 4),
      durationMinutes: Number(durationMinutes),
      positiveMarks: Number(positiveMarks || 4),
      negativeMarks: Number(negativeMarks || 1),
      passingMarks: Number(passingMarks || 360),
      subjects: subjects || ["Physics", "Chemistry", "Botany", "Zoology"],
      pattern: pattern || "NTA_NEET_2025",
      status: "published",
      createdAt: new Date().toISOString(),
      questions: selectedQuestions
    };

    store.createTest(newTest);

    if (isMongoDBConfigured()) {
      try {
        await connectToDatabase();
        await TestModel.findOneAndUpdate(
          { id: newTest.id },
          newTest,
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn("MongoDB test persistence warning:", dbErr);
      }
    }

    return NextResponse.json({ success: true, test: newTest }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create test" }, { status: 500 });
  }
}
