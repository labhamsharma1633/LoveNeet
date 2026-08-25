import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { parseMCQsFromText } from "@/lib/pdf-parser";
import { extractMCQsWithGemini } from "@/lib/gemini";
import { Question, TestConfig } from "@/lib/types";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { TestModel } from "@/lib/models/Test";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, manualText, apiKey } = body;

    const job = store.getPDFJobById(jobId);
    if (!job) {
      return NextResponse.json({ error: "PDF Job not found" }, { status: 404 });
    }

    const textToParse = manualText || job.rawText || "";
    let extractedDrafts: Question[] = [];
    let extractionSource: "gemini_vision_ai" | "deterministic_parser" = "deterministic_parser";

    // 1. Try Gemini Vision / Multimodal Extraction if API Key or document is available
    try {
      const geminiQuestions = await extractMCQsWithGemini(
        {
          text: textToParse,
          pdfBase64: job.pdfBase64,
          filename: job.filename
        },
        apiKey
      );

      if (geminiQuestions && geminiQuestions.length > 0) {
        extractedDrafts = geminiQuestions;
        extractionSource = "gemini_vision_ai";
      }
    } catch (aiErr) {
      console.warn("Gemini AI extraction fallback to deterministic parser:", aiErr);
    }

    // 2. Fallback to deterministic parser if Gemini didn't extract or no key provided
    if (extractedDrafts.length === 0) {
      extractedDrafts = parseMCQsFromText(textToParse, job.filename);
      extractionSource = "deterministic_parser";
    }

    // Save questions to both draft queue and active question bank
    store.addDraftQuestions(extractedDrafts);

    // Automatically create and publish a Live Test Session from the uploaded PDF
    const cleanName = job.filename
      .replace(/\.pdf$/i, "")
      .replace(/[_-]+/g, " ")
      .trim();

    const isPT02 = /test\s*0?2|pt\s*0?2/i.test(job.filename) || /Practice Test\s*-\s*0?2/i.test(textToParse || "");
    const isPT01 = (/test\s*0?1|pt\s*0?1/i.test(job.filename) || /Practice Test\s*-\s*0?1/i.test(textToParse || "")) && !isPT02;

    const formattedTitle = cleanName
      ? cleanName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : `NEET Assessment ${new Date().toLocaleDateString()}`;

    let computedTitle = formattedTitle.length > 3 ? formattedTitle : `NEET Test: ${job.filename}`;
    let computedId = `test-pdf-${Date.now()}`;
    let computedCode = `NEET-${cleanName.slice(0, 8).toUpperCase().replace(/\s+/g, "")}-${Date.now().toString().slice(-4)}`;

    const isFullMock = extractedDrafts.length >= 90;
    const detectedSubjects = Array.from(new Set(extractedDrafts.map((q) => q.subject)));

    if (isPT02) {
      computedId = "test-yakeen-neet-2027-pt02";
      computedTitle = `Yakeen NEET 2.0 (2027) — Practice Test 02 (Full Mock: ${extractedDrafts.length} Questions)`;
      computedCode = "YAKEEN-NEET-2027-PT02";
    } else if (isPT01) {
      computedId = "test-yakeen-neet-2027-pt01";
      computedTitle = `Yakeen NEET 2.0 (2027) — Practice Test 01 (Full Mock: ${extractedDrafts.length} Questions)`;
      computedCode = "YAKEEN-NEET-2027-PT01";
    } else if (isFullMock) {
      computedId = `test-full-mock-${Date.now()}`;
      computedTitle = `${computedTitle} (Full Mock: ${extractedDrafts.length} Questions)`;
    }

    const autoCreatedTest: TestConfig = {
      id: computedId,
      title: computedTitle,
      code: computedCode,
      description: `Auto-generated live test session from uploaded question paper: ${job.filename}. Includes ${extractedDrafts.length} authentic MCQs across ${detectedSubjects.join(", ")} with NTA +4 / -1 negative marking scheme.`,
      instructions: [
        `Total questions: ${extractedDrafts.length}. Attempt all questions across ${detectedSubjects.join(", ")}.`,
        "Marking Scheme: +4 marks for correct answers, -1 mark deducted for incorrect answers, 0 marks for unattempted.",
        "The test will automatically submit upon countdown timer expiration.",
        "Calculators and reference sheets are strictly prohibited."
      ],
      totalQuestions: extractedDrafts.length,
      totalMarks: extractedDrafts.length * 4,
      durationMinutes: isFullMock ? 180 : Math.max(25, Math.ceil(extractedDrafts.length * 1.8)),
      positiveMarks: 4,
      negativeMarks: 1,
      passingMarks: Math.floor(extractedDrafts.length * 4 * 0.5),
      subjects: detectedSubjects.length > 0 ? (detectedSubjects as any) : ["Physics", "Chemistry", "Botany", "Zoology"],
      pattern: isFullMock ? "NTA_NEET_2025" : "UNIT_TEST",
      status: "published",
      createdAt: new Date().toISOString(),
      questions: extractedDrafts
    };

    store.createTest(autoCreatedTest);

    // Persist to MongoDB if configured
    if (isMongoDBConfigured()) {
      try {
        await connectToDatabase();
        await TestModel.findOneAndUpdate(
          { id: autoCreatedTest.id },
          autoCreatedTest,
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn("MongoDB test persistence warning:", dbErr);
      }
    }

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
      extractionSource,
      autoCreatedTest
    });
  } catch (err: any) {
    console.error("PDF process error:", err);
    return NextResponse.json({ error: err.message || "PDF processing failed" }, { status: 500 });
  }
}
