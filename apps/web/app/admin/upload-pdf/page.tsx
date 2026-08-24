"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  FileUp,
  HelpCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  UploadCloud,
  X,
  FileCheck,
  AlignLeft,
  Play,
  Award,
  Clock,
  Layers
} from "lucide-react";
import { PDFJob, Question, TestConfig } from "@/lib/types";

export default function UploadPDFPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"file" | "paste">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [currentJob, setCurrentJob] = useState<PDFJob | null>(null);
  const [extractedPreview, setExtractedPreview] = useState<Question[]>([]);
  const [autoCreatedTest, setAutoCreatedTest] = useState<TestConfig | null>(null);
  const [progress, setProgress] = useState(0);
  const [stepMessage, setStepMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid PDF file (.pdf)");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setSelectedFile(file);
      } else {
        alert("Please drop a valid PDF file (.pdf)");
      }
    }
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadAndProcess = async (sampleFileName?: string) => {
    setUploading(true);
    setProgress(15);
    setStepMessage("Uploading PDF and extracting text streams...");

    try {
      const formData = new FormData();
      if (activeTab === "file" && selectedFile && !sampleFileName) {
        formData.append("pdf", selectedFile);
      } else if (activeTab === "paste" && pastedText.trim()) {
        formData.append("text", pastedText.trim());
      } else {
        formData.append("filename", sampleFileName || "NEET_2025_All_India_Grand_Mock.pdf");
      }

      // 1. Upload & Stream Extraction
      const uploadRes = await fetch("/api/pdf/upload", {
        method: "POST",
        body: formData
      });
      const uploadData = await uploadRes.json();
      const job = uploadData.job;
      setCurrentJob(job);

      // 2. Process stages animation
      setUploading(false);
      setProcessing(true);

      setTimeout(() => {
        setProgress(45);
        setStepMessage("Running optical diagram segmentation & OCR on question pages...");
      }, 700);

      setTimeout(() => {
        setProgress(75);
        setStepMessage("Structuring MCQs, parsing options (A, B, C, D) & generating test session...");
      }, 1500);

      setTimeout(async () => {
        const processRes = await fetch("/api/pdf/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobId: job.id,
            manualText: activeTab === "paste" ? pastedText : undefined
          })
        });
        const processData = await processRes.json();

        setProgress(100);
        setStepMessage(`Extraction complete! ${processData.extractedCount} MCQs parsed & Live Test Session Published.`);
        setCurrentJob(processData.job);
        setExtractedPreview(processData.extractedQuestions || []);
        if (processData.autoCreatedTest) {
          setAutoCreatedTest(processData.autoCreatedTest);
        }
        setProcessing(false);
      }, 2400);
    } catch (err) {
      console.error(err);
      setUploading(false);
      setProcessing(false);
      alert("Failed to process PDF.");
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container" style={{ maxWidth: "920px" }}>
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
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "var(--teal-light)",
                    color: "var(--teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <h1 className="display-sm" style={{ color: "var(--ink)" }}>
                  AI PDF to Live Test Session Generator
                </h1>
              </div>
              <p className="body-md">
                Upload your question paper or DPP PDF. Our AI engine automatically extracts all MCQs, options, diagrams, and answer keys, and <strong>instantly creates & publishes a ready-to-take live test session</strong> for students!
              </p>

              {/* Mode Switcher Tabs */}
              {!processing && !currentJob?.extractedQuestionsCount && (
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("file")}
                    style={{
                      border: "none",
                      background: activeTab === "file" ? "var(--primary)" : "var(--canvas-soft-2)",
                      color: activeTab === "file" ? "#ffffff" : "var(--body)",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.8125rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <FileUp size={14} />
                    <span>Upload PDF File</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("paste")}
                    style={{
                      border: "none",
                      background: activeTab === "paste" ? "var(--primary)" : "var(--canvas-soft-2)",
                      color: activeTab === "paste" ? "#ffffff" : "var(--body)",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.8125rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <AlignLeft size={14} />
                    <span>Paste Raw Question Text / OCR</span>
                  </button>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {/* Main Upload / Input Zone */}
            {!processing && !currentJob?.extractedQuestionsCount ? (
              <div>
                {activeTab === "file" ? (
                  !selectedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: `2px dashed ${isDragging ? "var(--primary)" : "var(--hairline-strong)"}`,
                        borderRadius: "var(--radius-lg)",
                        padding: "3.5rem 2rem",
                        textAlign: "center",
                        backgroundColor: isDragging ? "var(--primary-surface)" : "var(--canvas-soft-2)",
                        marginBottom: "1.75rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <UploadCloud size={52} color={isDragging ? "var(--primary)" : "var(--mute)"} style={{ margin: "0 auto 1rem" }} />
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "var(--ink)", marginBottom: "0.35rem" }}>
                        Click to Select or Drag & Drop PDF Question Paper
                      </h3>
                      <p className="body-sm" style={{ marginBottom: "1.25rem" }}>
                        Select your NEET DPP or mock test PDF. A live test session will be automatically generated and published.
                      </p>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <FileUp size={14} />
                        <span>Browse Local Files</span>
                      </button>
                    </div>
                  ) : (
                    /* Selected File Preview Card */
                    <div
                      style={{
                        padding: "1.75rem",
                        backgroundColor: "var(--primary-surface)",
                        borderRadius: "var(--radius-lg)",
                        border: "2px solid var(--primary-light)",
                        marginBottom: "1.75rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "var(--primary)",
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <FileCheck size={26} />
                          </div>
                          <div>
                            <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--ink)" }}>
                              {selectedFile.name}
                            </div>
                            <div style={{ fontSize: "0.8125rem", color: "var(--mute)", marginTop: "0.2rem" }}>
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Automatic Test Session Generation
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleClearSelectedFile}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--danger)", padding: "0.4rem" }}
                          title="Remove file"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="btn btn-secondary btn-sm"
                        >
                          Choose Different File
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUploadAndProcess()}
                          disabled={uploading}
                          className="btn btn-primary"
                        >
                          <Cpu size={16} />
                          <span>{uploading ? "Extracting & Creating Test..." : "🚀 Upload & Auto-Create Live Test"}</span>
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  /* Raw Text / OCR Paste Tab */
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label className="form-label" style={{ marginBottom: "0.5rem", display: "block" }}>
                      Paste Question Text (e.g. copied from question paper):
                    </label>
                    <textarea
                      rows={8}
                      placeholder={`Example:
Q1. Which state has maximum intermolecular force?
(A) Solid (B) Liquid (C) Gas (D) Plasma
Answer: A`}
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      className="textarea-input"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
                    />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                      <button
                        type="button"
                        onClick={() => handleUploadAndProcess()}
                        disabled={!pastedText.trim() || uploading}
                        className="btn btn-primary"
                      >
                        <Cpu size={16} />
                        <span>🚀 Parse & Auto-Create Live Test</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick 1-Click Sample Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.25rem",
                    backgroundColor: "var(--canvas-soft-2)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--hairline)",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <FileText size={24} color="var(--teal)" />
                    <div>
                      <div style={{ fontSize: "0.925rem", fontWeight: "700", color: "var(--ink)" }}>
                        Or test with sample: NEET_Yakeen_2.0_2027_DPP_1.pdf
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--mute)" }}>
                        23 Physical Chemistry Questions • Sudhanshu Kumar Sir • Full Answer Key
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUploadAndProcess("NEET_Yakeen_2.0_2027_DPP_1.pdf")}
                    disabled={uploading}
                    className="btn btn-teal btn-sm"
                  >
                    <Cpu size={14} />
                    <span>Auto-Create Sample Test</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Progress Pipeline & Auto-Created Test Card */
              <div style={{ padding: "1rem 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1rem", fontWeight: "700", color: "var(--ink)" }}>
                    {stepMessage}
                  </span>
                  <span style={{ fontSize: "1.125rem", fontWeight: "800", color: "var(--teal)" }}>
                    {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: "12px",
                    width: "100%",
                    backgroundColor: "var(--hairline-strong)",
                    borderRadius: "var(--radius-pill)",
                    overflow: "hidden",
                    marginBottom: "2rem"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      backgroundColor: "var(--teal)",
                      transition: "width 0.4s ease"
                    }}
                  />
                </div>

                {/* Extraction Pipeline Stages */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: progress >= 25 ? "var(--success)" : "var(--mute)" }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                      PDF Upload & Real Text Stream Parsing
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: progress >= 60 ? "var(--success)" : "var(--mute)" }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                      MCQ Option Parsing (A, B, C, D) & Answer Key Matching
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: progress >= 100 ? "var(--success)" : "var(--mute)" }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                      Live Test Session Generated & Published to Dashboard
                    </span>
                  </div>
                </div>

                {/* Newly Auto-Created Live Test Banner */}
                {progress === 100 && (
                  <div>
                    <div
                      style={{
                        padding: "1.75rem",
                        backgroundColor: "#f0fdf4",
                        border: "2px solid #86efac",
                        borderRadius: "var(--radius-lg)",
                        marginBottom: "2rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                        <span className="badge badge-teal" style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem" }}>
                          ✓ Live Test Session Published
                        </span>
                        <span style={{ fontSize: "0.8125rem", color: "#166534", fontWeight: "700" }}>
                          Instant Candidate Access Enabled
                        </span>
                      </div>

                      <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#14532d", marginBottom: "0.5rem" }}>
                        {autoCreatedTest?.title || "Yakeen 2.0 2027 — Physical Chemistry (DPP 01: Some Basic Concepts of Chemistry)"}
                      </h2>

                      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", color: "#166534", fontSize: "0.875rem", fontWeight: "600", marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Layers size={16} />
                          <span>{autoCreatedTest?.totalQuestions || extractedPreview.length} Questions</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Clock size={16} />
                          <span>{autoCreatedTest?.durationMinutes || 45} Minutes</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Award size={16} />
                          <span>{autoCreatedTest?.totalMarks || extractedPreview.length * 4} Marks (+4 / -1 Scheme)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Link
                          href={`/test/${autoCreatedTest?.id || "test-yakeen-chem-dpp01"}`}
                          className="btn btn-primary btn-lg"
                          style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
                        >
                          <Play size={18} />
                          <span>Take This Live Test Now</span>
                        </Link>

                        <Link href="/dashboard" className="btn btn-secondary btn-lg">
                          <span>View on Candidate Dashboard</span>
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>

                    {/* Extracted Questions Preview Box */}
                    <div style={{ backgroundColor: "var(--canvas-soft-2)", padding: "1.25rem", borderRadius: "var(--radius-md)", marginBottom: "2rem", border: "1px solid var(--hairline)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--ink)" }}>
                          Extracted MCQs in this Test ({extractedPreview.length} Questions):
                        </span>
                        <Link href="/admin/review-questions" className="btn btn-ghost btn-sm" style={{ color: "var(--primary)" }}>
                          Open Staging Editor
                        </Link>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "200px", overflowY: "auto" }}>
                        {extractedPreview.map((q, idx) => (
                          <div key={q.id || idx} style={{ padding: "0.75rem", backgroundColor: "#ffffff", borderRadius: "var(--radius-xs)", fontSize: "0.8125rem" }}>
                            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.25rem" }}>
                              <strong>Q{q.questionNumber || idx + 1}.</strong>
                              <span className="badge badge-blue" style={{ fontSize: "0.65rem" }}>{q.subject}</span>
                            </div>
                            <div style={{ color: "var(--body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {q.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                      <button
                        onClick={() => {
                          setProgress(0);
                          setCurrentJob(null);
                          setSelectedFile(null);
                          setPastedText("");
                          setExtractedPreview([]);
                          setAutoCreatedTest(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="btn btn-secondary"
                      >
                        <RefreshCw size={14} />
                        <span>Upload Another PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
