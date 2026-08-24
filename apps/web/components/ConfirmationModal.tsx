"use client";

import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Question, QuestionResponse, QuestionStatusState } from "@/lib/types";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  testTitle: string;
  questions: Question[];
  responses: Record<string, QuestionResponse>;
  isSubmitting?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  testTitle,
  questions,
  responses,
  isSubmitting = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  let answered = 0;
  let notAnswered = 0;
  let marked = 0;
  let answeredMarked = 0;
  let notVisited = 0;

  questions.forEach((q) => {
    const status: QuestionStatusState = responses[q.id]?.status || "not_visited";
    if (status === "answered") answered++;
    else if (status === "visited") notAnswered++;
    else if (status === "marked_for_review") marked++;
    else if (status === "answered_and_marked") answeredMarked++;
    else notVisited++;
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "540px",
          padding: "2rem",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-5)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--ink)" }}>
              Submit Examination?
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--mute)" }}>
              {testTitle}
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.875rem", color: "var(--body)", lineHeight: "1.5", marginBottom: "1.5rem" }}>
          Please review your attempt summary before final submission. Once submitted, answers will be evaluated with negative marking and cannot be altered.
        </p>

        {/* Tally Box */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            backgroundColor: "var(--canvas-soft-2)",
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            fontSize: "0.875rem"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", background: "#ffffff", borderRadius: "var(--radius-sm)" }}>
            <span style={{ color: "var(--success)", fontWeight: "600" }}>Answered:</span>
            <strong>{answered}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", background: "#ffffff", borderRadius: "var(--radius-sm)" }}>
            <span style={{ color: "var(--danger)", fontWeight: "600" }}>Not Answered:</span>
            <strong>{notAnswered}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", background: "#ffffff", borderRadius: "var(--radius-sm)" }}>
            <span style={{ color: "var(--purple)", fontWeight: "600" }}>Marked for Review:</span>
            <strong>{marked}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", background: "#ffffff", borderRadius: "var(--radius-sm)" }}>
            <span style={{ color: "#6d28d9", fontWeight: "600" }}>Ans & Marked:</span>
            <strong>{answeredMarked}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem", background: "#ffffff", borderRadius: "var(--radius-sm)", gridColumn: "span 2" }}>
            <span style={{ color: "var(--mute)", fontWeight: "600" }}>Not Visited:</span>
            <strong>{notVisited}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="btn btn-secondary"
          >
            Return to Test
          </button>

          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ minWidth: "140px" }}
          >
            {isSubmitting ? "Evaluating..." : "Yes, Submit Test"}
          </button>
        </div>
      </div>
    </div>
  );
}
