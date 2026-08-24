"use client";

import { NEETSubject, NEETSection } from "@/lib/types";

interface SubjectTabsProps {
  subjects: NEETSubject[];
  activeSubject: NEETSubject;
  activeSection: NEETSection;
  onSelectSubject: (subj: NEETSubject) => void;
  onSelectSection: (sec: NEETSection) => void;
  subjectAttemptCounts: Record<NEETSubject, { attempted: number; total: number }>;
}

export function SubjectTabs({
  subjects,
  activeSubject,
  activeSection,
  onSelectSubject,
  onSelectSection,
  subjectAttemptCounts
}: SubjectTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        backgroundColor: "var(--canvas)",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid var(--hairline)",
        borderRadius: "var(--radius-md) var(--radius-md) 0 0"
      }}
    >
      {/* Subject Selector Pills */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {subjects.map((subj) => {
          const isActive = activeSubject === subj;
          const stats = subjectAttemptCounts[subj] || { attempted: 0, total: 0 };

          return (
            <button
              key={subj}
              onClick={() => onSelectSubject(subj)}
              style={{
                border: "none",
                background: isActive ? "var(--primary)" : "var(--canvas-soft-2)",
                color: isActive ? "#ffffff" : "var(--body)",
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: "700",
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "0 2px 6px rgba(2, 132, 199, 0.3)" : "none"
              }}
            >
              <span>{subj}</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "var(--radius-pill)",
                  background: isActive ? "rgba(255, 255, 255, 0.25)" : "var(--hairline-strong)",
                  color: isActive ? "#ffffff" : "var(--ink)",
                  fontWeight: "600"
                }}
              >
                {stats.attempted}/{stats.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section Switcher (Section A vs Section B) */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingTop: "0.35rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--mute)" }}>
          Section:
        </span>
        {(["Section A", "Section B"] as NEETSection[]).map((sec) => (
          <button
            key={sec}
            onClick={() => onSelectSection(sec)}
            style={{
              border: "1px solid",
              borderColor: activeSection === sec ? "var(--teal)" : "var(--hairline-strong)",
              background: activeSection === sec ? "var(--teal-light)" : "transparent",
              color: activeSection === sec ? "var(--teal-hover)" : "var(--body)",
              fontWeight: "700",
              fontSize: "0.75rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer"
            }}
          >
            {sec} {sec === "Section A" ? "(Mandatory)" : "(Choice)"}
          </button>
        ))}
      </div>
    </div>
  );
}
