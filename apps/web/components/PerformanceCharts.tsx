"use client";

import { EvaluationResult, NEETSubject } from "@/lib/types";
import { Award, CheckCircle2, XCircle, MinusCircle, Zap, Clock, TrendingUp } from "lucide-react";

interface PerformanceChartsProps {
  result: EvaluationResult;
}

export function PerformanceCharts({ result }: PerformanceChartsProps) {
  const subjects: NEETSubject[] = ["Physics", "Chemistry", "Botany", "Zoology"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem"
        }}
      >
        {/* Score & Percentile */}
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--mute)", textTransform: "uppercase" }}>
              Total NEET Score
            </span>
            <Award size={20} color="var(--primary)" />
          </div>
          <div style={{ fontSize: "2.25rem", fontWeight: "800", color: "var(--ink)", letterSpacing: "-0.03em" }}>
            {result.finalScore}
            <span style={{ fontSize: "1.125rem", color: "var(--mute)", fontWeight: "500" }}>
              {" "}/ {result.maxScore}
            </span>
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.8125rem", color: "var(--primary)", fontWeight: "600" }}>
            Estimated Percentile: {result.estimatedPercentile}%
          </div>
        </div>

        {/* Accuracy & AIR */}
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--teal)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--mute)", textTransform: "uppercase" }}>
              Estimated All India Rank
            </span>
            <TrendingUp size={20} color="var(--teal)" />
          </div>
          <div style={{ fontSize: "2.25rem", fontWeight: "800", color: "var(--ink)", letterSpacing: "-0.03em" }}>
            AIR #{result.estimatedAIR.toLocaleString()}
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.8125rem", color: "var(--teal)", fontWeight: "600" }}>
            Percentage: {result.percentage}%
          </div>
        </div>

        {/* Accuracy Breakdown */}
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--success)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--mute)", textTransform: "uppercase" }}>
              Accuracy & Marking
            </span>
            <Zap size={20} color="var(--success)" />
          </div>
          <div style={{ fontSize: "2.25rem", fontWeight: "800", color: "var(--ink)", letterSpacing: "-0.03em" }}>
            {result.attemptedCount > 0 ? Math.round((result.correctCount / result.attemptedCount) * 100) : 0}%
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.8125rem", color: "#065f46", fontWeight: "600" }}>
            +{result.positiveMarksEarned} Marks Earned | -{result.negativeMarksLost} Lost
          </div>
        </div>

        {/* Time Taken */}
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--purple)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--mute)", textTransform: "uppercase" }}>
              Speed & Time
            </span>
            <Clock size={20} color="var(--purple)" />
          </div>
          <div style={{ fontSize: "2.25rem", fontWeight: "800", color: "var(--ink)", letterSpacing: "-0.03em" }}>
            {result.timeTakenMinutes} min
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.8125rem", color: "var(--purple)", fontWeight: "600" }}>
            Avg {result.attemptedCount > 0 ? Math.round((result.timeTakenMinutes * 60) / result.attemptedCount) : 0}s per attempted MCQ
          </div>
        </div>
      </div>

      {/* Subject-Wise Clinical Performance Breakdown */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "800", color: "var(--ink)", marginBottom: "1.25rem" }}>
          Subject-Wise NEET Score & Accuracy Breakdown
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {subjects.map((subj) => {
            const data = result.subjectBreakdown[subj];
            if (!data || data.totalQuestions === 0) return null;

            return (
              <div
                key={subj}
                style={{
                  padding: "1.25rem",
                  backgroundColor: "var(--canvas-soft-2)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--hairline)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: "800", color: "var(--ink)" }}>{subj}</span>
                    <span className="badge badge-blue">
                      Score: {data.netScore} / {data.totalPossibleMarks}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8125rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--success)", fontWeight: "700" }}>
                      <CheckCircle2 size={15} /> {data.correct} Correct (+{data.marksAwarded})
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--danger)", fontWeight: "700" }}>
                      <XCircle size={15} /> {data.incorrect} Incorrect (-{data.negativeMarksDeducted})
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--mute)", fontWeight: "600" }}>
                      <MinusCircle size={15} /> {data.unattempted} Unattempted
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: "10px",
                    width: "100%",
                    backgroundColor: "var(--hairline-strong)",
                    borderRadius: "var(--radius-pill)",
                    overflow: "hidden",
                    display: "flex"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${data.totalQuestions > 0 ? (data.correct / data.totalQuestions) * 100 : 0}%`,
                      backgroundColor: "var(--success)"
                    }}
                    title={`Correct: ${data.correct}`}
                  />
                  <div
                    style={{
                      height: "100%",
                      width: `${data.totalQuestions > 0 ? (data.incorrect / data.totalQuestions) * 100 : 0}%`,
                      backgroundColor: "var(--danger)"
                    }}
                    title={`Incorrect: ${data.incorrect}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
