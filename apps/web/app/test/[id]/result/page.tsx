"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PerformanceCharts } from "@/components/PerformanceCharts";
import {
  Activity,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  HelpCircle,
  RotateCcw,
  Sparkles,
  XCircle,
  Zap
} from "lucide-react";
import { EvaluationResult, Question, TestAttempt, TestConfig } from "@/lib/types";
import { NCERTReferenceBadge } from "@/components/NCERTReferenceBadge";
import { QuestionVariationsModal } from "@/components/QuestionVariationsModal";

export default function TestResultPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: testId } = use(params);
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [test, setTest] = useState<TestConfig | null>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "UNATTEMPTED">("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedVariationQuestion, setSelectedVariationQuestion] = useState<Question | null>(null);
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);

  useEffect(() => {
    if (!attemptId) return;

    fetch(`/api/attempts/${attemptId}/result`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setResult(data.result);
          setAttempt(data.attempt);
          setTest(data.test);

          // Trigger celebration confetti
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "4rem 0", textAlign: "center" }}>
          <div className="container">
            <Activity size={32} color="var(--primary)" className="animate-pulse-subtle" style={{ margin: "0 auto 1rem" }} />
            <h2>Evaluating NEET Performance & Calculating Percentile...</h2>
          </div>
        </main>
      </>
    );
  }

  if (!result || !test) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "4rem 0", textAlign: "center" }}>
          <div className="container">
            <h2>Result Not Available</h2>
            <p className="body-md" style={{ marginTop: "0.5rem" }}>
              Unable to locate the submitted examination record.
            </p>
            <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
              Back to Dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

  const questions = test.questions || [];

  const filteredQuestions = questions.filter((q) => {
    const resp = attempt?.responses[q.id];
    const isAttempted = !!resp?.selectedOptionId;
    const isCorrect = resp?.selectedOptionId === q.correctOptionId;

    if (activeFilter === "CORRECT") return isCorrect;
    if (activeFilter === "INCORRECT") return isAttempted && !isCorrect;
    if (activeFilter === "UNATTEMPTED") return !isAttempted;
    return true;
  });

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container" style={{ maxWidth: "1020px" }}>
          {/* Top Return link */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--mute)",
                fontSize: "0.875rem",
                fontWeight: "600"
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Candidate Dashboard</span>
            </Link>

            <Link href={`/test/${test.id}`} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} />
              <span>Retake This Test</span>
            </Link>
          </div>

          {/* Celebration Header */}
          <div
            className="card"
            style={{
              padding: "2rem 2.5rem",
              marginBottom: "2rem",
              background: "linear-gradient(135deg, #ffffff 0%, var(--primary-surface) 100%)",
              border: "1px solid var(--hairline)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="badge badge-teal" style={{ marginBottom: "0.5rem" }}>
                  OFFICIAL NEET EVALUATION REPORT
                </span>
                <h1 className="display-sm" style={{ color: "var(--ink)" }}>
                  {test.title}
                </h1>
                <p className="body-sm">
                  Candidate: <strong>{result.candidateName}</strong> • Submitted: {new Date(result.submittedAt).toLocaleTimeString()}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="caption-mono" style={{ color: "var(--mute)" }}>FINAL SCORE</span>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary)", lineHeight: "1.1" }}>
                  {result.finalScore}
                  <span style={{ fontSize: "1.25rem", color: "var(--mute)", fontWeight: "600" }}>
                    /{result.maxScore}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Charts & Metrics */}
          <div style={{ marginBottom: "3rem" }}>
            <PerformanceCharts result={result} />
          </div>

          {/* Question-By-Question Solution Review Section */}
          <div className="card" style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.75rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--hairline)",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div>
                <h2 className="display-sm" style={{ color: "var(--ink)" }}>
                  Step-by-Step Question & Solution Review
                </h2>
                <p className="body-sm">
                  Review your answers against the official NCERT / Clinical answer key.
                </p>
              </div>

              {/* Filter Pills */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className={`btn btn-sm ${activeFilter === "ALL" ? "btn-primary" : "btn-secondary"}`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setActiveFilter("CORRECT")}
                  className={`btn btn-sm ${activeFilter === "CORRECT" ? "btn-primary" : "btn-secondary"}`}
                  style={{ backgroundColor: activeFilter === "CORRECT" ? "var(--success)" : undefined }}
                >
                  Correct ({result.correctCount})
                </button>
                <button
                  onClick={() => setActiveFilter("INCORRECT")}
                  className={`btn btn-sm ${activeFilter === "INCORRECT" ? "btn-danger" : "btn-secondary"}`}
                >
                  Incorrect ({result.wrongCount})
                </button>
                <button
                  onClick={() => setActiveFilter("UNATTEMPTED")}
                  className={`btn btn-sm ${activeFilter === "UNATTEMPTED" ? "btn-primary" : "btn-secondary"}`}
                >
                  Unattempted ({result.unattemptedCount})
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {filteredQuestions.map((q, idx) => {
                const resp = attempt?.responses[q.id];
                const isAttempted = !!resp?.selectedOptionId;
                const isCorrect = resp?.selectedOptionId === q.correctOptionId;

                return (
                  <div
                    key={q.id}
                    style={{
                      padding: "1.5rem",
                      borderRadius: "var(--radius-md)",
                      border: `1px solid ${
                        isCorrect
                          ? "var(--success)"
                          : isAttempted
                          ? "var(--danger)"
                          : "var(--hairline-strong)"
                      }`,
                      backgroundColor: isCorrect
                        ? "rgba(16, 185, 129, 0.03)"
                        : isAttempted
                        ? "rgba(239, 68, 68, 0.03)"
                        : "var(--canvas)"
                    }}
                  >
                    {/* Question Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <strong style={{ fontSize: "1rem", color: "var(--ink)" }}>
                          Q{q.questionNumber || idx + 1}.
                        </strong>
                        <span className="badge badge-blue">{q.subject}</span>
                        <span className="badge badge-teal">{q.section}</span>
                        <span className="badge badge-gray">{q.topic}</span>
                        {q.ncertReference && <NCERTReferenceBadge reference={q.ncertReference} compact />}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVariationQuestion(q);
                            setIsVariationModalOpen(true);
                          }}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: !isCorrect ? "rgba(13, 148, 136, 0.12)" : "var(--canvas-soft-2)",
                            color: !isCorrect ? "var(--teal)" : "var(--ink)",
                            border: !isCorrect ? "1.5px solid var(--teal)" : "1px solid var(--hairline)",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            cursor: "pointer",
                            boxShadow: !isCorrect ? "0 2px 8px rgba(13, 148, 136, 0.2)" : "none"
                          }}
                          title="Generate and practice 3 new variations of this question"
                        >
                          <Zap size={13} color="var(--teal)" />
                          <span>Practice 3 AI Variations</span>
                        </button>

                        {isCorrect ? (
                          <span className="badge badge-green" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <CheckCircle2 size={14} /> Correct (+{q.marks})
                          </span>
                        ) : isAttempted ? (
                          <span className="badge badge-red" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <XCircle size={14} /> Incorrect (-{q.negativeMarks})
                          </span>
                        ) : (
                          <span className="badge badge-gray">Unattempted (0)</span>
                        )}
                      </div>
                    </div>

                    {/* Question Text */}
                    <div style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: "1.6", marginBottom: "1rem", whiteSpace: "pre-line" }}>
                      {q.text}
                    </div>

                    {/* Diagram (if available) */}
                    {q.diagramUrl && (
                      <div style={{ margin: "0.75rem 0 1.25rem", textAlign: "center" }}>
                        <img
                          src={q.diagramUrl}
                          alt="Diagnostic Diagram"
                          style={{
                            maxWidth: "440px",
                            maxHeight: "260px",
                            borderRadius: "var(--radius-sm)",
                            boxShadow: "var(--shadow-1)",
                            backgroundColor: "#ffffff"
                          }}
                        />
                      </div>
                    )}

                    {/* Options list */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
                      {q.options.map((opt) => {
                        const isOfficialCorrect = opt.id === q.correctOptionId;
                        const isUserChoice = resp?.selectedOptionId === opt.id;

                        let bg = "var(--canvas-soft-2)";
                        let border = "var(--hairline)";
                        let badgeText = null;

                        if (isOfficialCorrect) {
                          bg = "var(--success-light)";
                          border = "var(--success)";
                          badgeText = "Correct Key";
                        } else if (isUserChoice && !isCorrect) {
                          bg = "var(--danger-light)";
                          border = "var(--danger)";
                          badgeText = "Your Choice (Wrong)";
                        }

                        return (
                          <div
                            key={opt.id}
                            style={{
                              padding: "0.75rem 1rem",
                              borderRadius: "var(--radius-sm)",
                              border: `1px solid ${border}`,
                              backgroundColor: bg,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "0.875rem"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <strong style={{ width: "20px" }}>{opt.label}.</strong>
                              <span>{opt.text}</span>
                            </div>
                            {badgeText && (
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: "700",
                                  color: isOfficialCorrect ? "#065f46" : "#991b1b"
                                }}
                              >
                                {badgeText}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    <div
                      style={{
                        padding: "1rem",
                        backgroundColor: "var(--canvas-soft-2)",
                        borderRadius: "var(--radius-sm)",
                        borderLeft: "4px solid var(--primary)",
                        fontSize: "0.875rem"
                      }}
                    >
                      <div style={{ fontWeight: "700", color: "var(--primary)", marginBottom: "0.35rem" }}>
                        Detailed Solution & Mechanism:
                      </div>
                      <p style={{ color: "var(--body)", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                        {q.explanation}
                      </p>

                      {q.clinicalNote && (
                        <div
                          style={{
                            marginTop: "0.6rem",
                            padding: "0.5rem 0.75rem",
                            backgroundColor: "var(--teal-light)",
                            color: "#0f766e",
                            borderRadius: "var(--radius-xs)",
                            fontSize: "0.8125rem",
                            fontWeight: "600"
                          }}
                        >
                          {q.clinicalNote}
                        </div>
                      )}

                      {q.ncertReference && (
                        <div style={{ marginTop: "0.85rem" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#166534", marginBottom: "0.35rem" }}>
                            Official NCERT Line-by-Line Textbook Citation:
                          </div>
                          <NCERTReferenceBadge reference={q.ncertReference} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Interactive AI Question Variations Modal */}
      <QuestionVariationsModal
        baseQuestion={selectedVariationQuestion}
        isOpen={isVariationModalOpen}
        onClose={() => setIsVariationModalOpen(false)}
      />

      <Footer />
    </>
  );
}
