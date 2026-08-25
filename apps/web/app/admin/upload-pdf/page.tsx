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
import { useEffect } from "react";

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
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [extractionSource, setExtractionSource] = useState<string>("");

  useEffect(() => {
    const savedKey = localStorage.getItem("love_neet_gemini_key") || "";
    if (savedKey) setGeminiApiKey(savedKey);
  }, []);

  const handleSaveGeminiKey = (key: string) => {
    setGeminiApiKey(key);
    localStorage.setItem("love_neet_gemini_key", key.trim());
  };

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

  const extractClientPDFText = async (file: File): Promise<string> => {
    try {
      if (typeof window === "undefined") return "";

      if (!(window as any).pdfjsLib) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => {
            try {
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            } catch {}
            resolve();
          };
          script.onerror = () => resolve();
          document.head.appendChild(script);
        });
      }

      const pdfjsLib = (window as any).pdfjsLib;
      if (!pdfjsLib) return "";

      const buffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str || "").filter(Boolean);
        fullText += `\n\n--- Page ${i} ---\n` + strings.join(" ");
      }
      return fullText.trim();
    } catch (err) {
      console.warn("Client PDF extraction warning:", err);
      return "";
    }
  };

  const handleUploadAndProcess = async (sampleFileName?: string) => {
    setUploading(true);
    setProgress(15);
    setStepMessage("Decoding PDF fonts & extracting question text streams...");

    try {
      const formData = new FormData();
      if (activeTab === "file" && selectedFile && !sampleFileName) {
        formData.append("pdf", selectedFile);
        formData.append("filename", selectedFile.name);

        // Perform client-side high-precision Unicode font rendering
        const clientText = await extractClientPDFText(selectedFile);
        if (clientText && clientText.length > 20) {
          formData.append("text", clientText);
        }
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
            manualText: activeTab === "paste" ? pastedText : undefined,
            apiKey: geminiApiKey || undefined
          })
        });
        const processData = await processRes.json();

        setProgress(100);
        setStepMessage(`Extraction complete! ${processData.extractedCount} MCQs parsed & Live Test Session Published.`);
        setCurrentJob(processData.job);
        setExtractedPreview(processData.extractedQuestions || []);
        if (processData.extractionSource) {
          setExtractionSource(processData.extractionSource);
        }
        if (processData.autoCreatedTest) {
          setAutoCreatedTest(processData.autoCreatedTest);
          try {
            const existingRaw = localStorage.getItem("love_neet_custom_tests");
            const existing: TestConfig[] = existingRaw ? JSON.parse(existingRaw) : [];
            const filtered = existing.filter((t: TestConfig) => t.id !== processData.autoCreatedTest.id);
            localStorage.setItem(
              "love_neet_custom_tests",
              JSON.stringify([processData.autoCreatedTest, ...filtered])
            );
          } catch (e) {
            console.error("Custom test save error:", e);
          }
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

              {/* Gemini AI Multi-Modal Engine Status Bar */}
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: geminiApiKey ? "rgba(16, 185, 129, 0.08)" : "var(--canvas-soft-2)",
                  border: geminiApiKey ? "1px solid #10b981" : "1px solid var(--hairline)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <Sparkles size={18} color={geminiApiKey ? "#10b981" : "var(--primary)"} />
                    <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "var(--ink)" }}>
                      Universal AI Vision Extraction: {geminiApiKey ? "Active (Free Tier Enabled)" : "Default Engine Ready"}
                    </span>
                    {geminiApiKey ? (
                      <span className="badge badge-teal" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
                        ✓ Gemini 2.0 Connected
                      </span>
                    ) : (
                      <span className="badge" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", backgroundColor: "var(--hairline-strong)" }}>
                        Free Tier Ready
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowKeyConfig(!showKeyConfig)}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", color: "var(--primary)" }}
                  >
                    {showKeyConfig ? "Hide Key Settings" : (geminiApiKey ? "Update API Key" : "⚙ Connect Free Gemini Key")}
                  </button>
                </div>

                {showKeyConfig && (
                  <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--hairline)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--body)" }}>
                      Enter your free Google Gemini API Key from{" "}
                      <a
                        href="https://aistudio.google.com/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600" }}
                      >
                        Google AI Studio (100% Free • No Credit Card Required)
                      </a>
                      . With this key, any future scanned or multi-column PDF will be automatically parsed with zero code changes!
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <input
                        type="password"
                        placeholder="Paste your Gemini API key (AIzaSy...)"
                        value={geminiApiKey}
                        onChange={(e) => handleSaveGeminiKey(e.target.value)}
                        style={{
                          flex: 1,
                          minWidth: "240px",
                          padding: "0.45rem 0.75rem",
                          borderRadius: "var(--radius-xs)",
                          border: "1px solid var(--hairline-strong)",
                          fontSize: "0.8125rem",
                          outline: "none"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleSaveGeminiKey(geminiApiKey);
                          setShowKeyConfig(false);
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        Save Key
                      </button>
                      {geminiApiKey && (
                        <button
                          type="button"
                          onClick={() => {
                            handleSaveGeminiKey("");
                          }}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--danger)" }}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

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

                {/* Quick 1-Click Sample Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.25rem",
                      backgroundColor: "var(--primary-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--primary-light)",
                      flexWrap: "wrap",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          backgroundColor: "var(--teal)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--ink)" }}>
                          Yakeen NEET 2.0 (2027) — Practice Test 02 (Full 180 Questions)
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--body)", marginTop: "0.15rem" }}>
                          Vectors (45 Qs) • Some Basic Concepts (45 Qs) • Cell (45 Qs) • Structural Org & Frog (45 Qs) • 720 Marks
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUploadAndProcess("Yakeen_NEET_2.0_2027_Practice_Test_02.pdf")}
                      disabled={uploading}
                      className="btn btn-teal btn-sm"
                      style={{ fontWeight: "700" }}
                    >
                      <Cpu size={14} />
                      <span>Auto-Create PT-02 Mock Test</span>
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.25rem",
                      backgroundColor: "var(--primary-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--primary-light)",
                      flexWrap: "wrap",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          backgroundColor: "var(--primary)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--ink)" }}>
                          Yakeen NEET 2.0 (2027) — Practice Test 01 (Full 180 Questions)
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--body)", marginTop: "0.15rem" }}>
                          Physics (45 Qs) • Chemistry (45 Qs) • Botany (45 Qs) • Zoology (45 Qs) • 720 Marks • 180 Mins
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUploadAndProcess("Yakeen_NEET_2.0_2027_Practice_Test_01.pdf")}
                      disabled={uploading}
                      className="btn btn-primary btn-sm"
                      style={{ fontWeight: "700" }}
                    >
                      <Cpu size={14} />
                      <span>Auto-Create PT-01 Mock Test</span>
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 1.25rem",
                      backgroundColor: "var(--canvas-soft-2)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--hairline)",
                      flexWrap: "wrap",
                      gap: "0.75rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <FileText size={18} color="var(--teal)" />
                      <div style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: "600" }}>
                        Sample DPP: NEET_Yakeen_2.0_2027_DPP_1.pdf (23 Physical Chemistry Questions)
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUploadAndProcess("NEET_Yakeen_2.0_2027_DPP_1.pdf")}
                      disabled={uploading}
                      className="btn btn-teal btn-sm"
                    >
                      <Cpu size={14} />
                      <span>Parse DPP Sample</span>
                    </button>
                  </div>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        <span className="badge badge-teal" style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem" }}>
                          ✓ Live Test Session Published
                        </span>
                        {extractionSource === "gemini_vision_ai" ? (
                          <span className="badge badge-blue" style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                            <Sparkles size={13} />
                            <span>Parsed with Gemini Vision AI</span>
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.8125rem", color: "#166534", fontWeight: "700" }}>
                            Instant Candidate Access Enabled
                          </span>
                        )}
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
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--ink)" }}>
                          Extracted MCQs in this Test ({extractedPreview.length} Questions):
                        </span>
                        <Link href="/admin/review-questions" className="btn btn-ghost btn-sm" style={{ color: "var(--primary)" }}>
                          Open Staging Editor
                        </Link>
                      </div>

                      {/* Subject breakdown pills */}
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                        {["Physics", "Chemistry", "Botany", "Zoology"].map((subj) => {
                          const count = extractedPreview.filter((q) => q.subject === subj).length;
                          if (count === 0) return null;
                          return (
                            <span
                              key={subj}
                              className="badge badge-teal"
                              style={{ fontSize: "0.75rem", padding: "0.25rem 0.65rem", fontWeight: "700" }}
                            >
                              {subj}: {count} Questions
                            </span>
                          );
                        })}
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
