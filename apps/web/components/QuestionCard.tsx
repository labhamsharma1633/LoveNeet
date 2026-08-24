"use client";

import { Question, QuestionResponse } from "@/lib/types";
import { Bookmark, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, ZoomIn } from "lucide-react";
import { useState } from "react";
import { NCERTReferenceBadge } from "./NCERTReferenceBadge";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  response?: QuestionResponse;
  onSelectOption: (optionId: string) => void;
  onClearResponse: () => void;
  onMarkForReview: () => void;
  onSaveAndNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  response,
  onSelectOption,
  onClearResponse,
  onMarkForReview,
  onSaveAndNext,
  onPrevious,
  hasNext,
  hasPrevious
}: QuestionCardProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "var(--canvas)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-2)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid var(--hairline)"
      }}
    >
      {/* Header bar: Question index, subject badge, marks scheme */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          backgroundColor: "var(--canvas-soft)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "1.125rem", fontWeight: "800", color: "var(--ink)" }}>
            Question {currentIndex + 1}
            <span style={{ fontSize: "0.875rem", color: "var(--mute)", fontWeight: "500" }}>
              {" "}of {totalQuestions}
            </span>
          </span>
          <span className="badge badge-blue">{question.subject}</span>
          <span className="badge badge-teal">{question.section}</span>
          <span className="badge badge-gray">{question.topic}</span>
          {question.ncertReference && <NCERTReferenceBadge reference={question.ncertReference} compact />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#065f46",
              backgroundColor: "var(--success-light)",
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            +{question.marks} Correct
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#991b1b",
              backgroundColor: "var(--danger-light)",
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            -{question.negativeMarks} Negative
          </span>
        </div>
      </div>

      {/* Main Question Content Area */}
      <div
        style={{
          padding: "1.75rem",
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        {/* Question Text */}
        <div style={{ fontSize: "1.05rem", fontWeight: "500", color: "var(--ink)", lineHeight: "1.65", whiteSpace: "pre-line" }}>
          {question.text}
        </div>

        {/* Question Diagram / Image (if present) */}
        {question.diagramUrl && (
          <div
            style={{
              margin: "0.5rem 0",
              padding: "1rem",
              backgroundColor: "var(--canvas-soft-2)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--hairline-strong)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "0.5rem" }}>
              <span className="caption-mono" style={{ color: "var(--primary)" }}>
                Reference Diagnostic Diagram (Click to Zoom)
              </span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.75rem",
                  fontWeight: "600"
                }}
              >
                <ZoomIn size={14} />
                <span>{isZoomed ? "Shrink" : "Zoom"}</span>
              </button>
            </div>

            <img
              src={question.diagramUrl}
              alt="Question anatomical or schematic diagram"
              style={{
                maxWidth: isZoomed ? "100%" : "520px",
                maxHeight: isZoomed ? "600px" : "320px",
                objectFit: "contain",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "#ffffff",
                boxShadow: "var(--shadow-1)",
                transition: "all 0.2s ease"
              }}
            />
          </div>
        )}

        {/* Options List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {question.options.map((opt) => {
            const isSelected = response?.selectedOptionId === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${isSelected ? "var(--primary)" : "var(--hairline-strong)"}`,
                  backgroundColor: isSelected ? "var(--primary-surface)" : "var(--canvas)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 2px 8px rgba(2, 132, 199, 0.15)" : "none"
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: `2px solid ${isSelected ? "var(--primary)" : "var(--hairline-strong)"}`,
                    backgroundColor: isSelected ? "var(--primary)" : "transparent",
                    color: isSelected ? "#ffffff" : "var(--body)",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px"
                  }}
                >
                  {opt.label}
                </div>

                <div
                  style={{
                    fontSize: "0.975rem",
                    fontWeight: isSelected ? "600" : "400",
                    color: isSelected ? "var(--ink)" : "var(--body)",
                    lineHeight: "1.5"
                  }}
                >
                  {opt.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid var(--hairline)",
          backgroundColor: "var(--canvas-soft)",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}
      >
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            onClick={onClearResponse}
            disabled={!response?.selectedOptionId}
            className="btn btn-secondary btn-sm"
            style={{ opacity: response?.selectedOptionId ? 1 : 0.5 }}
          >
            <RotateCcw size={14} />
            <span>Clear Response</span>
          </button>

          <button
            onClick={onMarkForReview}
            className="btn btn-sm"
            style={{
              backgroundColor: "var(--purple-light)",
              color: "var(--purple)",
              borderColor: "var(--purple)"
            }}
          >
            <Bookmark size={14} />
            <span>Mark for Review & Next</span>
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="btn btn-secondary btn-sm"
            style={{ opacity: hasPrevious ? 1 : 0.5 }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button onClick={onSaveAndNext} className="btn btn-primary btn-sm">
            <span>Save & Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
