import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { PDFJob } from "@/lib/types";
import { extractPDFWithPythonWorker } from "@/lib/pdf-parser";

export async function GET() {
  const jobs = store.getPDFJobs();
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let filename = "NEET_Problem_Set_2025.pdf";
    let filesize = 2097152;
    let extractedRawText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("pdf") as File | null;
      const directText = formData.get("text") as string | null;

      if (file) {
        filename = file.name;
        filesize = file.size;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        extractedRawText = await extractPDFWithPythonWorker(buffer, filename);
      }

      if (directText && directText.trim()) {
        extractedRawText = (extractedRawText ? extractedRawText + "\n\n" : "") + directText.trim();
      }
    } else {
      const body = await req.json().catch(() => ({}));
      if (body.filename) filename = body.filename;
      if (body.filesize) filesize = body.filesize;
      if (body.text) extractedRawText = body.text;
    }

    const newJob: PDFJob = {
      id: `pdf-job-${Date.now()}`,
      filename,
      filesize,
      uploadedAt: new Date().toISOString(),
      status: "processing",
      pageCount: Math.max(1, Math.ceil(filesize / 250000)),
      extractedQuestionsCount: 0,
      progressPercent: 25,
      rawText: extractedRawText,
      extractedQuestions: []
    };

    store.createPDFJob(newJob);

    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (err: any) {
    console.error("PDF upload error:", err);
    return NextResponse.json({ error: err.message || "PDF upload failed" }, { status: 500 });
  }
}
