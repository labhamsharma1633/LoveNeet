export type UserRole = "admin" | "candidate";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type NEETSubject = "Physics" | "Chemistry" | "Botany" | "Zoology";

export type NEETSection = "Section A" | "Section B";

export type QuestionStatusState =
  | "not_visited"
  | "visited"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  targetYear?: number;
  rollNumber?: string;
}

export interface QuestionOption {
  id: string;
  label: "A" | "B" | "C" | "D" | string;
  text: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  questionNumber: number;
  subject: NEETSubject;
  section: NEETSection;
  topic: string;
  subtopic?: string;
  text: string;
  diagramUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  marks: number;
  negativeMarks: number;
  difficulty: QuestionDifficulty;
  explanation: string;
  clinicalNote?: string;
  sourcePage?: number;
  isAiExtracted?: boolean;
  reviewedByAdmin?: boolean;
}

export interface TestConfig {
  id: string;
  title: string;
  code: string;
  description: string;
  instructions: string[];
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
  passingMarks: number;
  subjects: NEETSubject[];
  pattern: "NTA_NEET_2025" | "UNIT_TEST" | "CUSTOM";
  status: "draft" | "published" | "archived";
  createdAt: string;
  scheduledAt?: string;
  questions?: Question[];
}

export interface QuestionResponse {
  questionId: string;
  selectedOptionId?: string;
  status: QuestionStatusState;
  timeSpentSeconds: number;
  isMarkedForReview: boolean;
  answeredAt?: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  candidateId: string;
  candidateName: string;
  startTime: string;
  endTimeExpected: string;
  submittedAt?: string;
  isSubmitted: boolean;
  durationMinutes: number;
  responses: Record<string, QuestionResponse>;
  currentQuestionId?: string;
}

export interface SubjectBreakdown {
  subject: NEETSubject;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  marksAwarded: number;
  negativeMarksDeducted: number;
  netScore: number;
  totalPossibleMarks: number;
  accuracyRate: number;
}

export interface EvaluationResult {
  attemptId: string;
  testId: string;
  candidateId: string;
  candidateName: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  markedForReviewCount: number;
  positiveMarksEarned: number;
  negativeMarksLost: number;
  finalScore: number;
  maxScore: number;
  percentage: number;
  estimatedPercentile: number;
  estimatedAIR: number;
  timeTakenMinutes: number;
  subjectBreakdown: Record<NEETSubject, SubjectBreakdown>;
  submittedAt: string;
}

export interface PDFJob {
  id: string;
  filename: string;
  filesize: number;
  uploadedAt: string;
  status: "pending" | "processing" | "extracting_ocr" | "identifying_mcqs" | "ready_for_review" | "failed";
  pageCount: number;
  extractedQuestionsCount: number;
  progressPercent: number;
  errorMessage?: string;
  rawText?: string;
  pdfBase64?: string;
  extractedQuestions: Question[];
}
