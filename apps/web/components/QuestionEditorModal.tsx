"use client";

import { useState } from "react";
import { Question, NEETSubject, NEETSection, QuestionDifficulty } from "@/lib/types";
import { Check, Save, X, Trash2, Image as ImageIcon } from "lucide-react";

interface QuestionEditorModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Question) => void;
}

export function QuestionEditorModal({
  question,
  isOpen,
  onClose,
  onSave
}: QuestionEditorModalProps) {
  if (!isOpen || !question) return null;

  const [text, setText] = useState(question.text);
  const [subject, setSubject] = useState<NEETSubject>(question.subject);
  const [section, setSection] = useState<NEETSection>(question.section);
  const [topic, setTopic] = useState(question.topic);
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>(question.difficulty);
  const [marks, setMarks] = useState(question.marks);
  const [negativeMarks, setNegativeMarks] = useState(question.negativeMarks);
  const [diagramUrl, setDiagramUrl] = useState(question.diagramUrl || "");
  const [options, setOptions] = useState(question.options);
  const [correctOptionId, setCorrectOptionId] = useState(question.correctOptionId);
  const [explanation, setExplanation] = useState(question.explanation);
  const [clinicalNote, setClinicalNote] = useState(question.clinicalNote || "");

  const handleOptionChange = (idx: number, newText: string) => {
    const updated = [...options];
    updated[idx] = { ...updated[idx], text: newText };
    setOptions(updated);
  };

  const handleSave = () => {
    const updatedQuestion: Question = {
      ...question,
      text,
      subject,
      section,
      topic,
      difficulty,
      marks: Number(marks),
      negativeMarks: Number(negativeMarks),
      diagramUrl: diagramUrl.trim() || undefined,
      options,
      correctOptionId,
      explanation,
      clinicalNote: clinicalNote.trim() || undefined,
      reviewedByAdmin: true
    };
    onSave(updatedQuestion);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1.5rem"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "840px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-5)",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid var(--hairline)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--canvas-soft)"
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--ink)" }}>
              Admin Question Review & Staging Editor
            </h3>
            <span style={{ fontSize: "0.8125rem", color: "var(--mute)" }}>
              ID: {question.id} {question.isAiExtracted ? "(Extracted from PDF)" : ""}
            </span>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: "0.4rem" }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div
          style={{
            padding: "1.75rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          }}
        >
          {/* Metadata row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as NEETSubject)}
                className="select-input"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Botany">Botany</option>
                <option value="Zoology">Zoology</option>
              </select>
            </div>

            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as NEETSection)}
                className="select-input"
              >
                <option value="Section A">Section A (Mandatory)</option>
                <option value="Section B">Section B (Choice)</option>
              </select>
            </div>

            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
                className="select-input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Topic / Unit</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-text"
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="form-control" style={{ margin: 0 }}>
            <label className="form-label">Question Text (Supports equations & clinical vignettes)</label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="textarea-input"
            />
          </div>

          {/* Diagram URL */}
          <div className="form-control" style={{ margin: 0 }}>
            <label className="form-label">Reference Diagram / Image URL</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="/images/heart-diagram.jpg or https://..."
                value={diagramUrl}
                onChange={(e) => setDiagramUrl(e.target.value)}
                className="input-text"
              />
            </div>
          </div>

          {/* Options List */}
          <div>
            <label className="form-label" style={{ marginBottom: "0.5rem", display: "block" }}>
              MCQ Options (Select Radio for Correct Answer)
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {options.map((opt, idx) => {
                const isCorrect = correctOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: isCorrect ? "var(--success-light)" : "var(--canvas-soft-2)",
                      borderRadius: "var(--radius-sm)",
                      border: `1px solid ${isCorrect ? "var(--success)" : "var(--hairline-strong)"}`
                    }}
                  >
                    <input
                      type="radio"
                      name="correctOption"
                      checked={isCorrect}
                      onChange={() => setCorrectOptionId(opt.id)}
                      style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    />
                    <span style={{ fontWeight: "700", width: "20px" }}>{opt.label}.</span>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="input-text"
                      style={{ flex: 1, backgroundColor: "#ffffff" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marks & Negative Marks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Positive Marks (+)</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="input-text"
              />
            </div>

            <div className="form-control" style={{ margin: 0 }}>
              <label className="form-label">Negative Marks (-)</label>
              <input
                type="number"
                value={negativeMarks}
                onChange={(e) => setNegativeMarks(Number(e.target.value))}
                className="input-text"
              />
            </div>
          </div>

          {/* Explanation & Clinical Note */}
          <div className="form-control" style={{ margin: 0 }}>
            <label className="form-label">Step-by-Step Clinical / Academic Solution</label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="textarea-input"
            />
          </div>

          <div className="form-control" style={{ margin: 0 }}>
            <label className="form-label">Clinical High-Yield Note (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Clinical correlation regarding receptor pharmacology..."
              value={clinicalNote}
              onChange={(e) => setClinicalNote(e.target.value)}
              className="input-text"
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            borderTop: "1px solid var(--hairline)",
            backgroundColor: "var(--canvas-soft)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem"
          }}
        >
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={16} />
            <span>Save & Approve Question</span>
          </button>
        </div>
      </div>
    </div>
  );
}
