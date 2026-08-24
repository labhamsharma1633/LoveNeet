import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttempt extends Document {
  id: string;
  testId: string;
  candidateId: string;
  candidateName: string;
  startTime: string;
  endTimeExpected: string;
  submittedAt?: string;
  durationMinutes: number;
  isSubmitted: boolean;
  responses: Record<string, any>;
  currentQuestionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttemptSchema = new Schema<IAttempt>(
  {
    id: { type: String, required: true, unique: true },
    testId: { type: String, required: true },
    candidateId: { type: String, required: true },
    candidateName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTimeExpected: { type: String, required: true },
    submittedAt: { type: String },
    durationMinutes: { type: Number, default: 180 },
    isSubmitted: { type: Boolean, default: false },
    responses: { type: Schema.Types.Mixed, default: {} },
    currentQuestionId: { type: String }
  },
  {
    timestamps: true
  }
);

export const AttemptModel: Model<IAttempt> =
  mongoose.models.Attempt || mongoose.model<IAttempt>("Attempt", AttemptSchema);

export interface IEvaluationResultDoc extends Document {
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
  subjectBreakdown: Record<string, any>;
  submittedAt: string;
}

const EvaluationResultSchema = new Schema<IEvaluationResultDoc>(
  {
    attemptId: { type: String, required: true, unique: true },
    testId: { type: String, required: true },
    candidateId: { type: String, required: true },
    candidateName: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    attemptedCount: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    wrongCount: { type: Number, required: true },
    unattemptedCount: { type: Number, required: true },
    markedForReviewCount: { type: Number, default: 0 },
    positiveMarksEarned: { type: Number, required: true },
    negativeMarksLost: { type: Number, required: true },
    finalScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    percentage: { type: Number, required: true },
    estimatedPercentile: { type: Number, required: true },
    estimatedAIR: { type: Number, required: true },
    timeTakenMinutes: { type: Number, required: true },
    subjectBreakdown: { type: Schema.Types.Mixed, required: true },
    submittedAt: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const EvaluationResultModel: Model<IEvaluationResultDoc> =
  mongoose.models.EvaluationResult ||
  mongoose.model<IEvaluationResultDoc>("EvaluationResult", EvaluationResultSchema);
