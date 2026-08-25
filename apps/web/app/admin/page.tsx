"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  FileCheck2,
  FileText,
  Plus,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { TestConfig } from "@/lib/types";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [tests, setTests] = useState<TestConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let customTests: TestConfig[] = [];
    try {
      const customRaw = localStorage.getItem("love_neet_custom_tests");
      if (customRaw) {
        customTests = JSON.parse(customRaw);
      }
    } catch (e) {
      console.error(e);
    }

    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
        const apiTests: TestConfig[] = data.tests || [];
        const combined = [...customTests];
        const seenIds = new Set(customTests.map((t) => t.id));

        for (const t of apiTests) {
          if (!seenIds.has(t.id)) {
            combined.push(t);
            seenIds.add(t.id);
          }
        }
        setTests(combined);
      })
      .catch((err) => {
        console.error(err);
        if (customTests.length > 0) {
          setTests(customTests);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTogglePublish = async (testId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/tests/${testId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setTests((prev) =>
          prev.map((t) => (t.id === testId ? { ...t, status: newStatus as any } : t))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container">
          {/* Admin Header */}
          <div
            className="card"
            style={{
              padding: "2rem 2.5rem",
              marginBottom: "2.5rem",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(2, 132, 199, 0.25)",
                  color: "#38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Shield size={30} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h1 className="display-sm" style={{ color: "#ffffff" }}>
                    Faculty & Admin Workbench
                  </h1>
                  <span className="badge badge-teal" style={{ background: "rgba(13, 148, 136, 0.3)", color: "#2dd4bf" }}>
                    HOD Access
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  Manage PDF OCR extraction, review AI staged MCQs, configure NTA tests, and audit candidate attempts.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/admin/upload-pdf" className="btn btn-teal">
                <Sparkles size={16} />
                <span>Upload PDF</span>
              </Link>
              <Link href="/admin/create-test" className="btn btn-primary">
                <Plus size={16} />
                <span>Create Test Series</span>
              </Link>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2.5rem"
            }}
          >
            <div className="card" style={{ padding: "1.5rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Total Tests
              </span>
              <div style={{ fontSize: "1.875rem", fontWeight: "800", color: "var(--ink)" }}>
                {metrics?.totalTests || 3}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>
                {metrics?.publishedTests || 3} Published & Live
              </span>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Question Bank
              </span>
              <div style={{ fontSize: "1.875rem", fontWeight: "800", color: "var(--teal)" }}>
                {metrics?.totalQuestions || 10} MCQs
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--teal)", fontWeight: "600" }}>
                Active with diagrams
              </span>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Pending Staged Drafts
              </span>
              <div style={{ fontSize: "1.875rem", fontWeight: "800", color: "var(--purple)" }}>
                {metrics?.pendingDraftsCount || 0} Drafts
              </div>
              <Link href="/admin/review-questions" style={{ fontSize: "0.75rem", color: "var(--purple)", fontWeight: "700" }}>
                Review Queue &rarr;
              </Link>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Candidate Attempts
              </span>
              <div style={{ fontSize: "1.875rem", fontWeight: "800", color: "var(--success)" }}>
                {metrics?.totalAttempts || 4}
              </div>
              <Link href="/admin/analytics" style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: "700" }}>
                View Scorebook &rarr;
              </Link>
            </div>
          </div>

          {/* Quick Action Hub */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem"
            }}
          >
            <Link
              href="/admin/upload-pdf"
              className="card"
              style={{
                padding: "1.75rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                borderLeft: "4px solid var(--teal)"
              }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--teal-light)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Cpu size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)", marginBottom: "0.25rem" }}>
                  PDF to MCQ Pipeline
                </h3>
                <p className="body-sm">
                  Upload raw problem sets, run automatic OCR, and crop high-yield biology/physics diagrams.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/review-questions"
              className="card"
              style={{
                padding: "1.75rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                borderLeft: "4px solid var(--purple)"
              }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--purple-light)", color: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileCheck2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)", marginBottom: "0.25rem" }}>
                  Question Review & Staging
                </h3>
                <p className="body-sm">
                  Verify AI-extracted questions, correct answers, formulas, diagrams, and marking rules.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="card"
              style={{
                padding: "1.75rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                borderLeft: "4px solid var(--primary)"
              }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)", marginBottom: "0.25rem" }}>
                  Scorebook & Item Analytics
                </h3>
                <p className="body-sm">
                  Examine candidate score distributions, negative penalty rates, and question difficulty index.
                </p>
              </div>
            </Link>
          </div>

          {/* Test Series Management Table */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h2 className="display-sm" style={{ color: "var(--ink)" }}>
                  Scheduled & Published Test Series
                </h2>
                <p className="body-sm">Control test availability, duration parameters, and status.</p>
              </div>

              <Link href="/admin/create-test" className="btn btn-primary btn-sm">
                <Plus size={14} />
                <span>New Test</span>
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--hairline)", color: "var(--mute)" }}>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Test Title</th>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Pattern</th>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Duration</th>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Questions</th>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textTransform: "uppercase", fontSize: "0.75rem", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t) => (
                    <tr key={t.id} style={{ borderBottom: "1px solid var(--hairline)" }}>
                      <td style={{ padding: "1rem" }}>
                        <strong style={{ color: "var(--ink)", display: "block" }}>{t.title}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--mute)" }}>Code: {t.code}</span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span className="badge badge-teal">{t.pattern}</span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {t.durationMinutes} mins
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {t.totalQuestions} MCQs ({t.totalMarks} M)
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          className={`badge ${
                            t.status === "published"
                              ? "badge-green"
                              : t.status === "draft"
                              ? "badge-amber"
                              : "badge-gray"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => handleTogglePublish(t.id, t.status)}
                            className="btn btn-secondary btn-sm"
                          >
                            {t.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                          <Link href={`/test/${t.id}`} className="btn btn-primary btn-sm">
                            Preview
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
