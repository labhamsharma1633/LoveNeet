"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Plus,
  Save,
  Shield,
  Zap
} from "lucide-react";
import { NEETSubject, Question } from "@/lib/types";

export default function CreateTestPage() {
  const router = useRouter();

  const [title, setTitle] = useState("NEET 2026 High-Yield Medical Sprint Test");
  const [code, setCode] = useState("NEET-SPRINT-2026");
  const [description, setDescription] = useState(
    "Targeted high-yield question paper covering Botany, Zoology, Physics, and Chemistry with authentic negative marking."
  );
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [positiveMarks, setPositiveMarks] = useState(4);
  const [negativeMarks, setNegativeMarks] = useState(1);
  const [passingMarks, setPassingMarks] = useState(180);
  const [pattern, setPattern] = useState<"NTA_NEET_2025" | "UNIT_TEST" | "CUSTOM">("NTA_NEET_2025");
  const [selectedSubjects, setSelectedSubjects] = useState<NEETSubject[]>([
    "Physics",
    "Chemistry",
    "Botany",
    "Zoology"
  ]);

  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/questions?type=approved")
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          setAvailableQuestions(data.questions);
          setSelectedQuestionIds(data.questions.map((q: Question) => q.id));
        }
      })
      .catch(console.error);
  }, []);

  const handleSubjectToggle = (subj: NEETSubject) => {
    if (selectedSubjects.includes(subj)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleQuestionToggle = (qId: string) => {
    if (selectedQuestionIds.includes(qId)) {
      setSelectedQuestionIds(selectedQuestionIds.filter((id) => id !== qId));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, qId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          code,
          description,
          durationMinutes: Number(durationMinutes),
          positiveMarks: Number(positiveMarks),
          negativeMarks: Number(negativeMarks),
          passingMarks: Number(passingMarks),
          pattern,
          subjects: selectedSubjects,
          questionIds: selectedQuestionIds
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        alert(data.error || "Failed to create test");
        setSaving(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving test");
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
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
          </div>

          <div className="card" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)" }}>
            <div style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
              <h1 className="display-sm" style={{ color: "var(--ink)", marginBottom: "0.35rem" }}>
                Create & Schedule NEET Test Series
              </h1>
              <p className="body-sm">
                Assemble questions from your verified Question Bank and configure NTA exam rules.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Title & Code */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Test Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-text"
                  />
                </div>

                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Test Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="input-text"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control" style={{ margin: 0 }}>
                <label className="form-label">Description & Syllabus Coverage</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea-input"
                />
              </div>

              {/* Timing & Scoring Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="input-text"
                  />
                </div>

                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Positive Mark (+)</label>
                  <input
                    type="number"
                    required
                    value={positiveMarks}
                    onChange={(e) => setPositiveMarks(Number(e.target.value))}
                    className="input-text"
                  />
                </div>

                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Negative Mark (-)</label>
                  <input
                    type="number"
                    required
                    value={negativeMarks}
                    onChange={(e) => setNegativeMarks(Number(e.target.value))}
                    className="input-text"
                  />
                </div>

                <div className="form-control" style={{ margin: 0 }}>
                  <label className="form-label">Passing Marks</label>
                  <input
                    type="number"
                    required
                    value={passingMarks}
                    onChange={(e) => setPassingMarks(Number(e.target.value))}
                    className="input-text"
                  />
                </div>
              </div>

              {/* Subjects Selector */}
              <div>
                <label className="form-label" style={{ marginBottom: "0.5rem", display: "block" }}>
                  Curriculum Subjects
                </label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {(["Physics", "Chemistry", "Botany", "Zoology"] as NEETSubject[]).map((s) => {
                    const isSelected = selectedSubjects.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSubjectToggle(s)}
                        style={{
                          border: `1px solid ${isSelected ? "var(--teal)" : "var(--hairline-strong)"}`,
                          background: isSelected ? "var(--teal-light)" : "var(--canvas-soft-2)",
                          color: isSelected ? "var(--teal-hover)" : "var(--body)",
                          padding: "0.5rem 1rem",
                          borderRadius: "var(--radius-sm)",
                          fontWeight: "700",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                      >
                        {s} {isSelected ? "✓" : "+"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Selection from Bank */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Select Questions from Question Bank ({selectedQuestionIds.length} Selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedQuestionIds.length === availableQuestions.length) {
                        setSelectedQuestionIds([]);
                      } else {
                        setSelectedQuestionIds(availableQuestions.map((q) => q.id));
                      }
                    }}
                    style={{ border: "none", background: "none", color: "var(--primary)", fontSize: "0.8125rem", fontWeight: "700", cursor: "pointer" }}
                  >
                    {selectedQuestionIds.length === availableQuestions.length ? "Deselect All" : "Select All"}
                  </button>
                </div>

                <div
                  style={{
                    maxHeight: "260px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    border: "1px solid var(--hairline)",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--canvas-soft-2)"
                  }}
                >
                  {availableQuestions.map((q, idx) => {
                    const isChecked = selectedQuestionIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.5rem 0.75rem",
                          backgroundColor: isChecked ? "var(--primary-surface)" : "#ffffff",
                          borderRadius: "var(--radius-xs)",
                          cursor: "pointer",
                          fontSize: "0.8125rem"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleQuestionToggle(q.id)}
                          style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                        />
                        <span style={{ fontWeight: "700", width: "40px" }}>Q{idx + 1}.</span>
                        <span className="badge badge-gray">{q.subject}</span>
                        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {q.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <Link href="/admin" className="btn btn-secondary">
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving || selectedQuestionIds.length === 0}
                  className="btn btn-primary btn-lg"
                >
                  <Save size={18} />
                  <span>{saving ? "Publishing Test..." : "Save & Publish Test"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
