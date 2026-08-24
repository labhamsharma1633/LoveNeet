"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Award,
  BookOpen,
  ArrowRight,
  Loader2,
  HelpCircle,
  Zap
} from "lucide-react";
import { Question, NCERTReference } from "@/lib/types";
import { NCERTReferenceBadge } from "./NCERTReferenceBadge";

interface QuestionVariationsModalProps {
  baseQuestion: Question | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionVariationsModal({
  baseQuestion,
  isOpen,
  onClose
}: QuestionVariationsModalProps) {
  const [variations, setVariations] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<number, string>>({});
  const [source, setSource] = useState<string>("deterministic");

  useEffect(() => {
    if (isOpen && baseQuestion) {
      fetchVariations();
    } else {
      setVariations([]);
      setUserSelections({});
      setActiveTab(0);
    }
  }, [isOpen, baseQuestion]);

  const fetchVariations = async () => {
    if (!baseQuestion) return;
    setLoading(true);
    setUserSelections({});
    try {
      const savedKey = localStorage.getItem("love_neet_gemini_key") || "";
      const res = await fetch("/api/questions/variations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: baseQuestion,
          count: 3,
          apiKey: savedKey || undefined
        })
      });
      const data = await res.json();
      if (data.variations && data.variations.length > 0) {
        setVariations(data.variations);
        setSource(data.source || "deterministic");
      }
    } catch (err) {
      console.error("Failed to fetch variations:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !baseQuestion) return null;

  const currentVar = variations[activeTab];
  const selectedOptId = userSelections[activeTab];
  const isAnswered = !!selectedOptId;
  const isCorrect = isAnswered && currentVar && selectedOptId === currentVar.correctOptionId;

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return; // Prevent changing after answer
    setUserSelections((prev) => ({
      ...prev,
      [activeTab]: optId
    }));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-xl)",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--hairline-strong)",
          animation: "scaleIn 0.2s ease"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--hairline)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "var(--teal)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--ink)", margin: 0 }}>
                  AI Question Variation Practice
                </h3>
                <span className="badge badge-teal" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
                  {source === "gemini" ? "✨ Gemini 2.0 AI Generated" : "⚡ Intelligent Numerical Mutator"}
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--mute)", margin: 0, marginTop: "0.15rem" }}>
                Mastering: <strong>{baseQuestion.subject}</strong> • {baseQuestion.topic}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--mute)",
              padding: "0.3rem",
              borderRadius: "50%"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <Loader2 size={36} className="animate-spin" style={{ margin: "0 auto 1rem", color: "var(--teal)" }} />
              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--ink)" }}>
                Generating 3 Fresh NEET Variations...
              </h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--mute)", marginTop: "0.25rem" }}>
                Mutating parameters and deriving authentic solutions with NCERT citations
              </p>
            </div>
          ) : variations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <HelpCircle size={40} style={{ margin: "0 auto 1rem", color: "var(--mute)" }} />
              <h4>No variations available.</h4>
              <button onClick={fetchVariations} className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
                <RefreshCw size={14} />
                <span>Try Again</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Original Question Context Box */}
              <div
                style={{
                  padding: "0.85rem 1rem",
                  backgroundColor: "var(--canvas-soft-2)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px dashed var(--hairline-strong)",
                  marginBottom: "1.25rem",
                  fontSize: "0.8125rem"
                }}
              >
                <span style={{ fontWeight: "700", color: "var(--mute)", fontSize: "0.75rem" }}>
                  ORIGINAL QUESTION CONTEXT (Q{baseQuestion.questionNumber}):
                </span>
                <div style={{ color: "var(--body)", marginTop: "0.25rem", fontStyle: "italic" }}>
                  "{baseQuestion.text.slice(0, 140)}..."
                </div>
              </div>

              {/* Variation Tabs */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {variations.map((v, idx) => {
                  const answered = !!userSelections[idx];
                  const userChoice = userSelections[idx];
                  const correct = answered && userChoice === v.correctOptionId;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      style={{
                        flex: 1,
                        padding: "0.6rem 0.75rem",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: activeTab === idx ? "var(--teal)" : "var(--canvas-soft-2)",
                        color: activeTab === idx ? "#ffffff" : "var(--ink)",
                        fontSize: "0.8125rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <span>Variation {idx + 1}</span>
                      {answered && (
                        correct ? (
                          <CheckCircle2 size={14} color={activeTab === idx ? "#ffffff" : "var(--success)"} />
                        ) : (
                          <XCircle size={14} color={activeTab === idx ? "#ffffff" : "var(--danger)"} />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Variation Question Card */}
              {currentVar && (
                <div
                  style={{
                    padding: "1.25rem",
                    border: "1.5px solid var(--hairline)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "#ffffff",
                    marginBottom: "1.25rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span className="badge badge-teal">Variant #{activeTab + 1}</span>
                      <span className="badge badge-blue">{currentVar.subject}</span>
                      {currentVar.ncertReference && (
                        <NCERTReferenceBadge reference={currentVar.ncertReference} compact />
                      )}
                    </div>

                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#065f46" }}>
                      +4 Correct / -1 Negative
                    </span>
                  </div>

                  {/* Question Text */}
                  <div style={{ fontSize: "0.925rem", color: "var(--ink)", lineHeight: "1.55", marginBottom: "1.25rem", fontWeight: "500", whiteSpace: "pre-line" }}>
                    {currentVar.text}
                  </div>

                  {/* Interactive Options List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {currentVar.options.map((opt) => {
                      const isSelected = selectedOptId === opt.id;
                      const isOfficialCorrect = opt.id === currentVar.correctOptionId;

                      let btnBorder = "var(--hairline-strong)";
                      let btnBg = "var(--canvas-soft)";
                      let textColor = "var(--ink)";

                      if (isAnswered) {
                        if (isOfficialCorrect) {
                          btnBg = "var(--success-light)";
                          btnBorder = "var(--success)";
                          textColor = "#065f46";
                        } else if (isSelected) {
                          btnBg = "var(--danger-light)";
                          btnBorder = "var(--danger)";
                          textColor = "#991b1b";
                        }
                      } else if (isSelected) {
                        btnBg = "var(--primary-surface)";
                        btnBorder = "var(--primary)";
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(opt.id)}
                          style={{
                            padding: "0.75rem 1rem",
                            border: `1.5px solid ${btnBorder}`,
                            borderRadius: "var(--radius-sm)",
                            backgroundColor: btnBg,
                            color: textColor,
                            textAlign: "left",
                            fontSize: "0.85rem",
                            cursor: isAnswered ? "default" : "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            transition: "all 0.15s ease"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <span
                              style={{
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                backgroundColor: isSelected ? "var(--teal)" : "rgba(0,0,0,0.06)",
                                color: isSelected ? "#ffffff" : "var(--ink)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: "800"
                              }}
                            >
                              {opt.label}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {isAnswered && (
                            isOfficialCorrect ? (
                              <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "var(--success)" }}>
                                ✓ Correct Option
                              </span>
                            ) : isSelected ? (
                              <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "var(--danger)" }}>
                                ✗ Your Answer
                              </span>
                            ) : null
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Solution Reveal */}
                  {isAnswered && (
                    <div
                      style={{
                        marginTop: "1.25rem",
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.06)" : "rgba(239, 68, 68, 0.06)",
                        borderLeft: `4px solid ${isCorrect ? "var(--success)" : "var(--danger)"}`,
                        animation: "fadeIn 0.25s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={16} color="var(--success)" />
                            <strong style={{ color: "#065f46", fontSize: "0.85rem" }}>
                              Spot on! (+4 Marks)
                            </strong>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} color="var(--danger)" />
                            <strong style={{ color: "#991b1b", fontSize: "0.85rem" }}>
                              Incorrect (-1 Mark) — Here's the Step-by-Step Solution:
                            </strong>
                          </>
                        )}
                      </div>

                      <p style={{ fontSize: "0.8125rem", color: "var(--body)", lineHeight: "1.5", margin: 0 }}>
                        {currentVar.explanation}
                      </p>

                      {currentVar.ncertReference && (
                        <div style={{ marginTop: "0.75rem" }}>
                          <NCERTReferenceBadge reference={currentVar.ncertReference} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--hairline)",
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <button
            type="button"
            onClick={fetchVariations}
            disabled={loading}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Generate Fresh Variations</span>
          </button>

          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            <span>Done Practicing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
