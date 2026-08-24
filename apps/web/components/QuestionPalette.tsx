"use client";

import { Question, QuestionResponse, QuestionStatusState } from "@/lib/types";
import { Check } from "lucide-react";

interface QuestionPaletteProps {
  questions: Question[];
  responses: Record<string, QuestionResponse>;
  currentQuestionId: string;
  onSelectQuestion: (questionId: string) => void;
}

export function QuestionPalette({
  questions,
  responses,
  currentQuestionId,
  onSelectQuestion
}: QuestionPaletteProps) {
  // Count the 5 states
  let countNotVisited = 0;
  let countVisited = 0;
  let countAnswered = 0;
  let countMarked = 0;
  let countAnsweredAndMarked = 0;

  questions.forEach((q) => {
    const resp = responses[q.id];
    const status: QuestionStatusState = resp?.status || "not_visited";

    if (status === "answered_and_marked") countAnsweredAndMarked++;
    else if (status === "marked_for_review") countMarked++;
    else if (status === "answered") countAnswered++;
    else if (status === "visited") countVisited++;
    else countNotVisited++;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        backgroundColor: "var(--canvas)",
        padding: "1.25rem",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-2)",
        height: "100%"
      }}
    >
      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--ink)", borderBottom: "1px solid var(--hairline)", paddingBottom: "0.75rem" }}>
        Question Palette (NTA Grid)
      </h3>

      {/* Legend */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.6rem",
          fontSize: "0.75rem",
          fontWeight: "600",
          backgroundColor: "var(--canvas-soft-2)",
          padding: "0.85rem",
          borderRadius: "var(--radius-md)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div className="palette-btn palette-not-visited" style={{ width: "22px", height: "22px", fontSize: "0.7rem" }}>
            {countNotVisited}
          </div>
          <span style={{ color: "var(--mute)" }}>Not Visited</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div className="palette-btn palette-visited" style={{ width: "22px", height: "22px", fontSize: "0.7rem" }}>
            {countVisited}
          </div>
          <span style={{ color: "var(--danger)" }}>Not Answered</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div className="palette-btn palette-answered" style={{ width: "22px", height: "22px", fontSize: "0.7rem" }}>
            {countAnswered}
          </div>
          <span style={{ color: "var(--success)" }}>Answered</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div className="palette-btn palette-marked" style={{ width: "22px", height: "22px", fontSize: "0.7rem" }}>
            {countMarked}
          </div>
          <span style={{ color: "var(--purple)" }}>Marked for Review</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", gridColumn: "span 2" }}>
          <div className="palette-btn palette-answered-marked" style={{ width: "22px", height: "22px", fontSize: "0.7rem", position: "relative" }}>
            {countAnsweredAndMarked}
            <div style={{ position: "absolute", bottom: "-3px", right: "-3px", width: "8px", height: "8px", background: "#34d399", borderRadius: "50%" }} />
          </div>
          <span style={{ color: "#6d28d9" }}>Answered & Marked for Review</span>
        </div>
      </div>

      {/* Question Number Grid */}
      <div style={{ overflowY: "auto", maxHeight: "380px", paddingRight: "0.25rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.6rem"
          }}
        >
          {questions.map((q, idx) => {
            const resp = responses[q.id];
            const status: QuestionStatusState = resp?.status || "not_visited";
            const isCurrent = q.id === currentQuestionId;

            let statusClass = "palette-not-visited";
            if (status === "answered_and_marked") statusClass = "palette-answered-marked";
            else if (status === "marked_for_review") statusClass = "palette-marked";
            else if (status === "answered") statusClass = "palette-answered";
            else if (status === "visited") statusClass = "palette-visited";

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={`palette-btn ${statusClass} ${isCurrent ? "palette-current" : ""}`}
                title={`Question ${idx + 1} (${q.subject} - ${q.section})`}
              >
                {idx + 1}
                {status === "answered_and_marked" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-3px",
                      right: "-3px",
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#34d399",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ffffff"
                    }}
                  >
                    <Check size={8} color="#ffffff" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
