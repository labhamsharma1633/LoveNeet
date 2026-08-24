import { NextRequest, NextResponse } from "next/server";
import { generateQuestionVariations } from "@/lib/question-variator";
import { Question } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, count = 3, apiKey } = body as {
      question: Question;
      count?: number;
      apiKey?: string;
    };

    if (!question || !question.text) {
      return NextResponse.json(
        { error: "Valid base question payload required." },
        { status: 400 }
      );
    }

    const { variations, source } = await generateQuestionVariations(
      question,
      count,
      apiKey
    );

    return NextResponse.json({
      success: true,
      variations,
      source,
      baseQuestionId: question.id
    });
  } catch (err: any) {
    console.error("Question variation route error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate question variations." },
      { status: 500 }
    );
  }
}
