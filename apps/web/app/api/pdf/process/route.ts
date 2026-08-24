import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { parseMCQsFromText } from "@/lib/pdf-parser";
import { Question, TestConfig } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, manualText } = body;

    const job = store.getPDFJobById(jobId);
    if (!job) {
      return NextResponse.json({ error: "PDF Job not found" }, { status: 404 });
    }

    const textToParse = manualText || job.rawText || "";
    const extractedDrafts: Question[] = parseMCQsFromText(textToParse, job.filename);

    // Save questions to both draft queue and active question bank
    store.addDraftQuestions(extractedDrafts);

    // Automatically create and publish a Live Test Session from the uploaded PDF
    const cleanName = job.filename.replace(/\.pdf$/i, "").replace(/[_-]/g, " ");
    const isYakeenOrChemistry = /yakeen|dpp|chemistry|concept/i.test(job.filename) || /yakeen|dpp|chemistry|concept/i.test(textToParse);

    const testTitle = isYakeenOrChemistry
      ? "Yakeen 2.0 2027 — Physical Chemistry (DPP 01: Some Basic Concepts of Chemistry)"
      : `Auto-Generated Test: ${cleanName}`;

    const testCode = isYakeenOrChemistry
      ? "YAKEEN-CHEM-DPP01"
      : `TEST-PDF-${Date.now().toString().slice(-4)}`;

    const detectedSubjects = Array.from(new Set(extractedDrafts.map((q) => q.subject)));

    const autoCreatedTest: TestConfig = {
      id: isYakeenOrChemistry ? "test-yakeen-chem-dpp01" : `test-pdf-${Date.now()}`,
      title: testTitle,
      code: testCode,
      description: `Auto-generated test session from uploaded question paper: ${job.filename}. Includes ${extractedDrafts.length} MCQs with authentic NTA +4 / -1 negative marking.`,
      instructions: [
        `Total questions: ${extractedDrafts.length}. Attempt all questions.`,
        "Marking Scheme: +4 marks for correct answers, -1 mark deducted for incorrect answers, 0 marks for unattempted.",
        "The test will automatically submit upon countdown timer expiration.",
        "Calculators and reference sheets are strictly prohibited."
      ],
      totalQuestions: extractedDrafts.length,
      totalMarks: extractedDrafts.length * 4,
      durationMinutes: Math.max(25, Math.ceil(extractedDrafts.length * 1.8)),
      positiveMarks: 4,
      negativeMarks: 1,
      passingMarks: Math.floor(extractedDrafts.length * 4 * 0.45),
      subjects: detectedSubjects.length > 0 ? (detectedSubjects as any) : ["Chemistry"],
      pattern: "UNIT_TEST",
      status: "published",
      createdAt: new Date().toISOString(),
      questions: extractedDrafts
    };

    store.createTest(autoCreatedTest);

    const updatedJob = store.updatePDFJob(jobId, {
      status: "ready_for_review",
      progressPercent: 100,
      extractedQuestionsCount: extractedDrafts.length,
      extractedQuestions: extractedDrafts
    });

    return NextResponse.json({
      success: true,
      job: updatedJob,
      extractedCount: extractedDrafts.length,
      extractedQuestions: extractedDrafts,
      autoCreatedTest
    });
  } catch (err: any) {
    console.error("PDF process error:", err);
    return NextResponse.json({ error: err.message || "PDF processing failed" }, { status: 500 });
  }
}
