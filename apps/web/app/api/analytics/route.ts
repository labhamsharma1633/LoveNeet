import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const tests = store.getTests();
  const results = store.getAllResults();
  const pdfJobs = store.getPDFJobs();
  const questions = store.getQuestions();
  const drafts = store.getDraftQuestions();

  const totalCandidates = new Set(results.map((r) => r.candidateId)).size;
  const totalAttempts = results.length;

  const avgScore =
    totalAttempts > 0
      ? Math.round(results.reduce((acc, r) => acc + r.finalScore, 0) / totalAttempts)
      : 0;

  const avgPercentage =
    totalAttempts > 0
      ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalAttempts)
      : 0;

  return NextResponse.json({
    metrics: {
      totalTests: tests.length,
      publishedTests: tests.filter((t) => t.status === "published").length,
      totalQuestions: questions.length,
      pendingDraftsCount: drafts.length,
      uploadedPDFs: pdfJobs.length,
      totalCandidates,
      totalAttempts,
      averageScore: avgScore,
      averagePercentage: avgPercentage
    },
    recentResults: results.slice(-10).reverse(),
    tests
  });
}
