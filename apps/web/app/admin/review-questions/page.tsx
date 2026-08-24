"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuestionEditorModal } from "@/components/QuestionEditorModal";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Edit3,
  FileCheck2,
  Plus,
  Sparkles,
  Trash2,
  Zap
} from "lucide-react";
import { Question } from "@/lib/types";
import { NCERTReferenceBadge } from "@/components/NCERTReferenceBadge";
import { QuestionVariationsModal } from "@/components/QuestionVariationsModal";

export default function ReviewQuestionsPage() {
  const [drafts, setDrafts] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [approving, setApproving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedVariationQuestion, setSelectedVariationQuestion] = useState<Question | null>(null);
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/questions?type=draft")
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) setDrafts(data.questions);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleEditClick = (q: Question) => {
    setSelectedQuestion(q);
    setIsEditorOpen(true);
  };

  const handleSaveQuestion = async (updated: Question) => {
    try {
      const res = await fetch("/api/questions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setDrafts((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
        setIsEditorOpen(false);
        setSuccessMessage(`Saved and verified Question #${updated.questionNumber || updated.id}`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBatchApprove = async () => {
    if (drafts.length === 0) return;
    setApproving(true);

    try {
      const ids = drafts.map((d) => d.id);
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", questionIds: ids })
      });
      const data = await res.json();
      if (data.success) {
        setDrafts([]);
        setSuccessMessage(`Successfully approved ${data.approvedCount} questions to official Question Bank!`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setApproving(false);
    }
  };

  const filteredDrafts =
    activeSubject === "All"
      ? drafts
      : drafts.filter((d) => d.subject.toLowerCase() === activeSubject.toLowerCase());

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <Link
              href="/admin"
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
              <span>Back to Admin Workbench</span>
            </Link>

            <Link href="/admin/create-test" className="btn btn-teal btn-sm">
              <Plus size={14} />
              <span>Create Test Series with Questions</span>
            </Link>
          </div>

          {/* Workbench Card */}
          <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h1 className="display-sm" style={{ color: "var(--ink)" }}>
                    AI Question Review & Verification Workbench
                  </h1>
                  <span className="badge badge-purple">
                    {drafts.length} Queued Drafts
                  </span>
                </div>
                <p className="body-sm" style={{ marginTop: "0.25rem" }}>
                  Human-in-the-loop validation: AI extractions are never published without faculty sign-off.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={handleBatchApprove}
                  disabled={drafts.length === 0 || approving}
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--success)", borderColor: "var(--success)" }}
                >
                  <CheckCircle2 size={16} />
                  <span>{approving ? "Approving..." : `Approve All (${drafts.length})`}</span>
                </button>
              </div>
            </div>

            {successMessage && (
              <div
                style={{
                  padding: "0.85rem 1.25rem",
                  backgroundColor: "var(--success-light)",
                  color: "#065f46",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Subject Filters */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
              {["All", "Zoology", "Botany", "Physics", "Chemistry"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubject(sub)}
                  style={{
                    border: "none",
                    background: activeSubject === sub ? "var(--primary)" : "var(--canvas-soft-2)",
                    color: activeSubject === sub ? "#ffffff" : "var(--body)",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "0.8125rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Questions List */}
            {drafts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "var(--canvas-soft-2)", borderRadius: "var(--radius-md)" }}>
                <CheckCircle2 size={48} color="var(--success)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.25rem", color: "var(--ink)", fontWeight: "700" }}>
                  All Staged Questions Approved!
                </h3>
                <p className="body-sm" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                  Your question bank is up to date. You can upload another PDF or assemble a new mock test.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                  <Link href="/admin/upload-pdf" className="btn btn-secondary btn-sm">
                    Upload More PDFs
                  </Link>
                  <Link href="/admin/create-test" className="btn btn-primary btn-sm">
                    Build New Test
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {filteredDrafts.map((q, idx) => {
                  const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: "1.5rem",
                        backgroundColor: "var(--canvas)",
                        border: "1px solid var(--hairline-strong)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                      }}
                    >
                      {/* Top Bar */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "1rem", fontWeight: "800", color: "var(--ink)" }}>
                            Question #{q.questionNumber || idx + 1}
                          </span>
                          <span className="badge badge-blue">{q.subject}</span>
                          <span className="badge badge-teal">{q.section}</span>
                          <span className="badge badge-gray">{q.topic}</span>
                          {q.ncertReference && <NCERTReferenceBadge reference={q.ncertReference} compact />}
                          {q.diagramUrl && <span className="badge badge-purple">Has Diagram</span>}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.8125rem", color: "var(--success)", fontWeight: "700" }}>
                            +{q.marks} / -{q.negativeMarks} Marks
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedVariationQuestion(q);
                              setIsVariationModalOpen(true);
                            }}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "rgba(13, 148, 136, 0.12)",
                              color: "var(--teal)",
                              border: "1.5px solid var(--teal)",
                              fontSize: "0.75rem",
                              fontWeight: "700"
                            }}
                            title="Generate 3 fresh variants of this question"
                          >
                            <Zap size={13} />
                            <span>3 AI Variations</span>
                          </button>

                          <button
                            onClick={() => handleEditClick(q)}
                            className="btn btn-secondary btn-sm"
                          >
                            <Edit3 size={14} />
                            <span>Edit & Verify</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: "1.55", whiteSpace: "pre-line" }}>
                        {q.text}
                      </div>

                      {/* Diagram thumbnail */}
                      {q.diagramUrl && (
                        <div>
                          <img
                            src={q.diagramUrl}
                            alt="Reference diagram"
                            style={{ maxHeight: "160px", borderRadius: "var(--radius-sm)", border: "1px solid var(--hairline)" }}
                          />
                        </div>
                      )}

                      {/* Options Grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem" }}>
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            style={{
                              padding: "0.5rem 0.75rem",
                              backgroundColor: opt.id === q.correctOptionId ? "var(--success-light)" : "var(--canvas-soft-2)",
                              border: `1px solid ${opt.id === q.correctOptionId ? "var(--success)" : "var(--hairline)"}`,
                              borderRadius: "var(--radius-xs)",
                              fontSize: "0.8125rem",
                              color: "var(--ink)"
                            }}
                          >
                            <strong>{opt.label}.</strong> {opt.text}
                          </div>
                        ))}
                      </div>

                      {/* Solution Note */}
                      <div style={{ fontSize: "0.8125rem", color: "var(--body)", backgroundColor: "var(--canvas-soft-2)", padding: "0.75rem", borderRadius: "var(--radius-xs)" }}>
                        <strong style={{ color: "var(--primary)" }}>Solution Key: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Admin Question Editor Modal */}
      <QuestionEditorModal
        question={selectedQuestion}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveQuestion}
      />

      {/* AI Question Variations Modal */}
      <QuestionVariationsModal
        baseQuestion={selectedVariationQuestion}
        isOpen={isVariationModalOpen}
        onClose={() => setIsVariationModalOpen(false)}
      />

      <Footer />
    </>
  );
}
