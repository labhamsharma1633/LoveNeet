import mongoose, { Schema, Document, Model } from "mongoose";
import { NEETSubject, QuestionDifficulty, TestStatus } from "../types";

const NCERTReferenceSubSchema = new Schema(
  {
    book: { type: String },
    chapterName: { type: String },
    chapterNumber: { type: Number },
    pageNumber: { type: Number },
    paragraphOrTopic: { type: String },
    exactLineQuote: { type: String },
    edition: { type: String }
  },
  { _id: false }
);

const OptionSubSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String }
  },
  { _id: false }
);

const QuestionSubSchema = new Schema(
  {
    id: { type: String, required: true },
    questionNumber: { type: Number },
    subject: { type: String, required: true },
    section: { type: String, default: "Section A" },
    topic: { type: String, default: "General" },
    text: { type: String, required: true },
    diagramUrl: { type: String },
    options: [OptionSubSchema],
    correctOptionId: { type: String, required: true },
    marks: { type: Number, default: 4 },
    negativeMarks: { type: Number, default: 1 },
    difficulty: { type: String, default: "medium" },
    explanation: { type: String, default: "" },
    clinicalNote: { type: String },
    ncertReference: NCERTReferenceSubSchema,
    sourcePage: { type: Number },
    isAiExtracted: { type: Boolean, default: false },
    reviewedByAdmin: { type: Boolean, default: true }
  },
  { _id: false }
);

export interface ITest extends Document {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  positiveMarks: number;
  negativeMarks: number;
  subjects: NEETSubject[];
  difficulty: QuestionDifficulty;
  status: TestStatus;
  questions: any[];
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema = new Schema<ITest>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    durationMinutes: { type: Number, default: 180 },
    totalMarks: { type: Number, default: 720 },
    positiveMarks: { type: Number, default: 4 },
    negativeMarks: { type: Number, default: 1 },
    subjects: [{ type: String }],
    difficulty: { type: String, default: "medium" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    questions: [QuestionSubSchema],
    createdBy: { type: String }
  },
  {
    timestamps: true
  }
);

export const TestModel: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);
