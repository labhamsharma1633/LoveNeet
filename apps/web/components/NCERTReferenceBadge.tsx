"use client";

import { useState } from "react";
import { BookOpen, Check, Copy, ExternalLink, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { NCERTReference } from "@/lib/types";

interface NCERTReferenceBadgeProps {
  reference?: NCERTReference;
  compact?: boolean;
}

export function NCERTReferenceBadge({ reference, compact = false }: NCERTReferenceBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!reference) return null;

  const handleCopyQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (reference.exactLineQuote) {
      navigator.clipboard.writeText(
        `"${reference.exactLineQuote}" — ${reference.book}, Chapter ${reference.chapterNumber} (${reference.chapterName}), Page ${reference.pageNumber}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.4rem" }}>
      {/* Pill Badge Trigger */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: compact ? "0.2rem 0.6rem" : "0.35rem 0.8rem",
          backgroundColor: "#f0fdf4",
          border: "1.5px solid #86efac",
          borderRadius: "var(--radius-pill)",
          color: "#166534",
          fontSize: compact ? "0.72rem" : "0.78rem",
          fontWeight: "700",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 3px rgba(22, 101, 52, 0.08)"
        }}
        title="Click to view authentic NCERT line-by-line textbook reference"
      >
        <BookOpen size={compact ? 12 : 14} color="#16a34a" />
        <span>
          NCERT {reference.book.replace("Class ", "Cl ")} • Ch {reference.chapterNumber}, Pg {reference.pageNumber}
        </span>
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {/* Expandable NCERT Textbook Excerpt Card */}
      {expanded && (
        <div
          style={{
            marginTop: "0.3rem",
            padding: "1rem 1.15rem",
            backgroundColor: "#f0fdf4",
            border: "1.5px solid #bbf7d0",
            borderRadius: "var(--radius-md)",
            fontSize: "0.8125rem",
            color: "#14532d",
            boxShadow: "0 4px 14px rgba(22, 101, 52, 0.12)",
            maxWidth: "600px",
            animation: "fadeIn 0.25s ease"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.15rem 0.5rem",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "0.68rem",
                  fontWeight: "800"
                }}
              >
                <Sparkles size={10} />
                <span>NTA NEET Direct Source</span>
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#166534" }}>
                {reference.book}
              </span>
            </div>

            {reference.exactLineQuote && (
              <button
                type="button"
                onClick={handleCopyQuote}
                style={{
                  border: "none",
                  background: "transparent",
                  color: copied ? "#16a34a" : "#15803d",
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}
                title="Copy NCERT citation"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy Quote"}</span>
              </button>
            )}
          </div>

          <div style={{ fontWeight: "800", color: "#14532d", marginBottom: "0.35rem", fontSize: "0.875rem" }}>
            Chapter {reference.chapterNumber}: {reference.chapterName}
          </div>

          {reference.paragraphOrTopic && (
            <div style={{ fontSize: "0.75rem", color: "#166534", fontWeight: "600", marginBottom: "0.5rem" }}>
              Topic: <strong>{reference.paragraphOrTopic}</strong> • Page: <strong>{reference.pageNumber}</strong>
            </div>
          )}

          {reference.exactLineQuote && (
            <div
              style={{
                padding: "0.6rem 0.8rem",
                backgroundColor: "#ffffff",
                borderRadius: "var(--radius-xs)",
                borderLeft: "3.5px solid #16a34a",
                fontStyle: "italic",
                color: "#1f2937",
                fontSize: "0.8125rem",
                lineHeight: "1.45"
              }}
            >
              “{reference.exactLineQuote}”
            </div>
          )}
        </div>
      )}
    </div>
  );
}
