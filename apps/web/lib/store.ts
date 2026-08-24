import {
  EvaluationResult,
  NEETSubject,
  PDFJob,
  Question,
  QuestionResponse,
  SubjectBreakdown,
  TestAttempt,
  TestConfig,
  UserProfile
} from "./types";
import { DEFAULT_TESTS, SAMPLE_NEET_QUESTIONS } from "./neet-data";
import { YAKEEN_CHEMISTRY_DPP1_QUESTIONS } from "./pdf-parser";
import { YAKEEN_NEET_2027_PRACTICE_TEST_01_QUESTIONS } from "./yakeen-test01-data";

export const DEFAULT_USERS: UserProfile[] = [
  {
    id: "user-cand-01",
    name: "Dr. Aakash Sharma (Aspirant)",
    email: "candidate@example.com",
    role: "candidate",
    targetYear: 2026,
    rollNumber: "NEET2026-984210"
  },
  {
    id: "user-admin-01",
    name: "Dr. Sunita Deshmukh (Admin / HOD)",
    email: "admin@example.com",
    role: "admin",
    rollNumber: "FACULTY-NEET-01"
  }
];

class MemoryStore {
  private users: UserProfile[] = [...DEFAULT_USERS];
  private tests: TestConfig[] = [...DEFAULT_TESTS];
  private questions: Question[] = [...SAMPLE_NEET_QUESTIONS];
  private draftQuestions: Question[] = [...YAKEEN_CHEMISTRY_DPP1_QUESTIONS];
  private attempts: Map<string, TestAttempt> = new Map();
  private results: Map<string, EvaluationResult> = new Map();
  private pdfJobs: PDFJob[] = [
    {
      id: "pdf-job-sample-01",
      filename: "NEET_Yakeen_2.0_2027_DPP_1.pdf",
      filesize: 1048576,
      uploadedAt: new Date().toISOString(),
      status: "ready_for_review",
      pageCount: 3,
      extractedQuestionsCount: 23,
      progressPercent: 100,
      extractedQuestions: YAKEEN_CHEMISTRY_DPP1_QUESTIONS
    }
  ];

  // ─── Users ───
  getUsers(): UserProfile[] {
    return this.users;
  }

  getUserById(id: string): UserProfile | undefined {
    return this.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string): UserProfile | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(user: UserProfile): UserProfile {
    this.users.push(user);
    return user;
  }

  // ─── Tests ───
  getTests(status?: "draft" | "published" | "archived"): TestConfig[] {
    if (!this.tests || this.tests.length < DEFAULT_TESTS.length) {
      this.tests = [...DEFAULT_TESTS, ...(this.tests ? this.tests.filter(t => !DEFAULT_TESTS.some(dt => dt.id === t.id)) : [])];
    }
    if (status) {
      return this.tests.filter((t) => t.status === status);
    }
    return this.tests;
  }

  getTestById(id: string): TestConfig | undefined {
    if (!this.tests || this.tests.length < DEFAULT_TESTS.length) {
      this.tests = [...DEFAULT_TESTS, ...(this.tests ? this.tests.filter(t => !DEFAULT_TESTS.some(dt => dt.id === t.id)) : [])];
    }
    return this.tests.find((t) => t.id === id);
  }

  createTest(test: TestConfig): TestConfig {
    this.tests.unshift(test);
    return test;
  }

  updateTest(id: string, updates: Partial<TestConfig>): TestConfig | undefined {
    const idx = this.tests.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    this.tests[idx] = { ...this.tests[idx], ...updates };
    return this.tests[idx];
  }

  deleteTest(id: string): boolean {
    const initialLen = this.tests.length;
    this.tests = this.tests.filter((t) => t.id !== id);
    return this.tests.length < initialLen;
  }

  // ─── Questions ───
  getQuestions(): Question[] {
    return this.questions;
  }

  getDraftQuestions(): Question[] {
    if (!this.draftQuestions || this.draftQuestions.length === 0) {
      this.draftQuestions = [...YAKEEN_CHEMISTRY_DPP1_QUESTIONS];
    }
    return this.draftQuestions;
  }

  addDraftQuestions(questions: Question[]) {
    // Filter out previous corrupted/duplicate questions with identical question numbers
    const newIds = new Set(questions.map(q => q.id));
    this.draftQuestions = [
      ...questions,
      ...this.draftQuestions.filter(q => !newIds.has(q.id))
    ];
  }

  updateDraftQuestion(id: string, updates: Partial<Question>): Question | undefined {
    const idx = this.draftQuestions.findIndex((q) => q.id === id);
    if (idx !== -1) {
      this.draftQuestions[idx] = { ...this.draftQuestions[idx], ...updates };
      return this.draftQuestions[idx];
    }
    const qIdx = this.questions.findIndex((q) => q.id === id);
    if (qIdx !== -1) {
      this.questions[qIdx] = { ...this.questions[qIdx], ...updates };
      return this.questions[qIdx];
    }
    return undefined;
  }

  deleteDraftQuestion(id: string): boolean {
    const initial = this.draftQuestions.length;
    this.draftQuestions = this.draftQuestions.filter((q) => q.id !== id);
    return this.draftQuestions.length < initial;
  }

  approveDraftQuestions(ids: string[]): Question[] {
    const approved: Question[] = [];
    this.draftQuestions = this.draftQuestions.filter((q) => {
      if (ids.includes(q.id)) {
        q.reviewedByAdmin = true;
        this.questions.push(q);
        approved.push(q);
        return false;
      }
      return true;
    });
    return approved;
  }

  // ─── Attempts ───
  createAttempt(attempt: TestAttempt): TestAttempt {
    this.attempts.set(attempt.id, attempt);
    return attempt;
  }

  getAttempt(id: string): TestAttempt | undefined {
    return this.attempts.get(id);
  }

  getAttemptsByCandidate(candidateId: string): TestAttempt[] {
    return Array.from(this.attempts.values()).filter(
      (a) => a.candidateId === candidateId
    );
  }

  updateAttemptResponses(
    attemptId: string,
    responses: Record<string, QuestionResponse>,
    currentQuestionId?: string
  ): TestAttempt | undefined {
    const attempt = this.attempts.get(attemptId);
    if (!attempt) return undefined;
    attempt.responses = { ...attempt.responses, ...responses };
    if (currentQuestionId) {
      attempt.currentQuestionId = currentQuestionId;
    }
    this.attempts.set(attemptId, attempt);
    return attempt;
  }

  // ─── Server-Side Evaluation Engine ───
  submitAttempt(attemptId: string, testIdFallback?: string): EvaluationResult | undefined {
    let attempt = this.attempts.get(attemptId);
    if (!attempt) {
      const targetTestId = testIdFallback || (attemptId.includes("yakeen") ? "test-yakeen-chem-dpp01" : "test-neet-grand-01");
      const fallbackAttempt: TestAttempt = {
        id: attemptId,
        testId: targetTestId,
        candidateId: "user-cand-01",
        candidateName: "Dr. Aakash Sharma",
        startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        endTimeExpected: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
        durationMinutes: 45,
        isSubmitted: true,
        responses: {}
      };
      this.attempts.set(attemptId, fallbackAttempt);
      attempt = fallbackAttempt;
    }

    if (!attempt) return undefined;

    const test = this.getTestById(attempt.testId);
    if (!test) return undefined;

    let testQuestions = test.questions;
    if (!testQuestions || testQuestions.length === 0) {
      if (test.id.includes("pt01") || test.id.includes("2027") || test.title.includes("Practice Test 01") || test.title.includes("180 Questions")) {
        testQuestions = YAKEEN_NEET_2027_PRACTICE_TEST_01_QUESTIONS;
      } else if (test.id.includes("yakeen") || test.id.includes("chem") || test.title.includes("Chemistry")) {
        testQuestions = YAKEEN_CHEMISTRY_DPP1_QUESTIONS;
      } else {
        testQuestions = this.getQuestions().filter((q) => test.subjects.includes(q.subject));
        if (testQuestions.length === 0) testQuestions = this.getQuestions();
      }
    }

    attempt.isSubmitted = true;
    attempt.submittedAt = new Date().toISOString();

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let markedForReviewCount = 0;

    const subjects: NEETSubject[] = ["Physics", "Chemistry", "Botany", "Zoology"];
    const subjectBreakdown: Record<NEETSubject, SubjectBreakdown> = {
      Physics: {
        subject: "Physics",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        marksAwarded: 0,
        negativeMarksDeducted: 0,
        netScore: 0,
        totalPossibleMarks: 0,
        accuracyRate: 0
      },
      Chemistry: {
        subject: "Chemistry",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        marksAwarded: 0,
        negativeMarksDeducted: 0,
        netScore: 0,
        totalPossibleMarks: 0,
        accuracyRate: 0
      },
      Botany: {
        subject: "Botany",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        marksAwarded: 0,
        negativeMarksDeducted: 0,
        netScore: 0,
        totalPossibleMarks: 0,
        accuracyRate: 0
      },
      Zoology: {
        subject: "Zoology",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        marksAwarded: 0,
        negativeMarksDeducted: 0,
        netScore: 0,
        totalPossibleMarks: 0,
        accuracyRate: 0
      }
    };

    // Calculate score based strictly on question configuration
    for (const q of testQuestions) {
      const resp = attempt.responses[q.id];
      const subj = q.subject;
      if (!subjectBreakdown[subj]) continue;

      subjectBreakdown[subj].totalQuestions += 1;
      subjectBreakdown[subj].totalPossibleMarks += q.marks || test.positiveMarks;

      if (resp?.isMarkedForReview) {
        markedForReviewCount += 1;
      }

      if (!resp || !resp.selectedOptionId) {
        unattemptedCount += 1;
        subjectBreakdown[subj].unattempted += 1;
      } else {
        // Candidate attempted
        const isCorrect = resp.selectedOptionId === q.correctOptionId;
        subjectBreakdown[subj].attempted += 1;

        if (isCorrect) {
          correctCount += 1;
          const pos = q.marks || test.positiveMarks;
          subjectBreakdown[subj].correct += 1;
          subjectBreakdown[subj].marksAwarded += pos;
        } else {
          wrongCount += 1;
          const neg = q.negativeMarks !== undefined ? q.negativeMarks : test.negativeMarks;
          subjectBreakdown[subj].incorrect += 1;
          subjectBreakdown[subj].negativeMarksDeducted += neg;
        }
      }
    }

    let totalEarned = 0;
    let totalDeducted = 0;

    for (const subj of subjects) {
      const b = subjectBreakdown[subj];
      b.netScore = b.marksAwarded - b.negativeMarksDeducted;
      b.accuracyRate = b.attempted > 0 ? Math.round((b.correct / b.attempted) * 100) : 0;
      totalEarned += b.marksAwarded;
      totalDeducted += b.negativeMarksDeducted;
    }

    const finalScore = totalEarned - totalDeducted;
    const maxScore = test.totalMarks || testQuestions.length * test.positiveMarks;
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;

    // Percentile & Rank estimation formula based on NEET bell-curve scoring
    const ratio = Math.max(0, finalScore / (maxScore || 720));
    const estimatedPercentile = Number(Math.min(99.98, Math.max(10.0, 100 / (1 + Math.exp(-6 * (ratio - 0.5)))))).toFixed(2);
    const estimatedAIR = Math.max(1, Math.round((100 - Number(estimatedPercentile)) * 24000));

    const startTime = new Date(attempt.startTime).getTime();
    const submitTime = new Date(attempt.submittedAt).getTime();
    const timeTakenMinutes = Math.max(1, Math.round((submitTime - startTime) / 60000));

    const result: EvaluationResult = {
      attemptId,
      testId: test.id,
      candidateId: attempt.candidateId,
      candidateName: attempt.candidateName,
      totalQuestions: testQuestions.length,
      attemptedCount: correctCount + wrongCount,
      correctCount,
      wrongCount,
      unattemptedCount,
      markedForReviewCount,
      positiveMarksEarned: totalEarned,
      negativeMarksLost: totalDeducted,
      finalScore,
      maxScore,
      percentage,
      estimatedPercentile: Number(estimatedPercentile),
      estimatedAIR,
      timeTakenMinutes,
      subjectBreakdown,
      submittedAt: attempt.submittedAt
    };

    this.results.set(attemptId, result);
    return result;
  }

  getResult(attemptId: string): EvaluationResult | undefined {
    return this.results.get(attemptId);
  }

  getAllResults(): EvaluationResult[] {
    return Array.from(this.results.values());
  }

  // ─── PDF Jobs ───
  getPDFJobs(): PDFJob[] {
    return this.pdfJobs;
  }

  getPDFJobById(id: string): PDFJob | undefined {
    return this.pdfJobs.find((j) => j.id === id);
  }

  createPDFJob(job: PDFJob): PDFJob {
    this.pdfJobs.unshift(job);
    return job;
  }

  updatePDFJob(id: string, updates: Partial<PDFJob>): PDFJob | undefined {
    const idx = this.pdfJobs.findIndex((j) => j.id === id);
    if (idx === -1) return undefined;
    this.pdfJobs[idx] = { ...this.pdfJobs[idx], ...updates };
    return this.pdfJobs[idx];
  }
}

// Global Singleton for in-memory persistence across Next.js dev hot-reloads
const globalForStore = globalThis as unknown as { loveNeetStore?: MemoryStore };

export const store = globalForStore.loveNeetStore || new MemoryStore();
if (process.env.NODE_ENV !== "production") {
  globalForStore.loveNeetStore = store;
}
