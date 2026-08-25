"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  User,
  Zap
} from "lucide-react";
import { TestConfig, UserProfile, EvaluationResult } from "@/lib/types";

export default function CandidateDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tests, setTests] = useState<TestConfig[]>([]);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("love_neet_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.name?.includes("Sunita")) {
          localStorage.removeItem("love_neet_user");
          setUser(null);
        } else {
          setUser(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Load custom tests saved locally
    let customTests: TestConfig[] = [];
    try {
      const customRaw = localStorage.getItem("love_neet_custom_tests");
      if (customRaw) {
        customTests = JSON.parse(customRaw);
      }
    } catch (e) {
      console.error(e);
    }

    fetch("/api/tests?role=candidate")
      .then((res) => res.json())
      .then((data) => {
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

  const filteredTests =
    selectedSubjectFilter === "All"
      ? tests
      : tests.filter((t) =>
          t.subjects.some((s) => s.toLowerCase() === selectedSubjectFilter.toLowerCase())
        );

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 4rem", backgroundColor: "var(--canvas-soft)", minHeight: "80vh" }}>
        <div className="container">
          {/* Candidate Profile Header Card */}
          <div
            className="card"
            style={{
              padding: "2rem",
              marginBottom: "2.5rem",
              background: "linear-gradient(135deg, #ffffff 0%, var(--primary-surface) 100%)",
              border: "1px solid var(--hairline)",
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
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--teal) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)"
                }}
              >
                <User size={32} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h1 className="display-sm" style={{ color: "var(--ink)" }}>
                    {user?.name || "Medical Aspirant"}
                  </h1>
                  <span className="badge badge-teal">Candidate Portal</span>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.35rem", fontSize: "0.8125rem", color: "var(--body)" }}>
                  <span>Roll No: <strong>{user?.rollNumber || "NEET-ASPIRANT"}</strong></span>
                  <span>•</span>
                  <span>Target: <strong>NEET {user?.targetYear || 2026} (MBBS)</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {!user && (
                <Link href="/auth?role=candidate" className="btn btn-secondary">
                  <span>Sign In as Candidate</span>
                </Link>
              )}
              <Link href={`/test/${tests[0]?.id || "test-neet-grand-01"}`} className="btn btn-primary">
                <Play size={16} />
                <span>Resume Active Mock</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2.5rem"
            }}
          >
            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Tests Attempted
              </span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--ink)" }}>
                4 Tests
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: "600" }}>
                +1 this week
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Highest Score
              </span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--primary)" }}>
                642 / 720
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>
                98.8th Percentile
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Average Accuracy
              </span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--teal)" }}>
                87.4%
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--teal)", fontWeight: "600" }}>
                Negative penalty minimized
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.35rem" }}>
                Target MBBS Cutoff
              </span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--purple)" }}>
                615+ Marks
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--purple)", fontWeight: "600" }}>
                Govt Medical College
              </span>
            </div>
          </div>

          {/* College Predictor Quick Access Banner */}
          <div
            className="card"
            style={{
              padding: "1.5rem 2rem",
              marginBottom: "2.5rem",
              background: "linear-gradient(135deg, #0f766e 0%, #0369a1 100%)",
              color: "#ffffff",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
              boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.25)"
            }}
          >
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.6rem", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "var(--radius-pill)", fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                <Sparkles size={13} />
                <span>AIIMS, MAMC & State GMCs</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ffffff", margin: "0 0 0.25rem 0" }}>
                Check Your NEET 2026 Medical College & AIR Chances
              </h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
                Simulate scores from 300 to 720 to see authentic closing ranks and admission probabilities by category & quota.
              </p>
            </div>

            <Link
              href="/college-predictor"
              className="btn btn-sm"
              style={{
                backgroundColor: "#ffffff",
                color: "#0f766e",
                fontWeight: "800",
                fontSize: "0.85rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-md)"
              }}
            >
              <span>Launch College Predictor 🏥</span>
            </Link>
          </div>

          {/* Test Series Filter Tabs */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 className="display-sm" style={{ color: "var(--ink)" }}>
              Available NEET Test Series
            </h2>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["All", "Physics", "Chemistry", "Zoology", "Botany"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubjectFilter(sub)}
                  style={{
                    border: "none",
                    background: selectedSubjectFilter === sub ? "var(--primary)" : "var(--canvas)",
                    color: selectedSubjectFilter === sub ? "#ffffff" : "var(--body)",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "0.8125rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-1)",
                    transition: "all 0.15s ease"
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Tests Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.75rem" }}>
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="card"
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <span className="badge badge-teal">{test.pattern}</span>
                    <span className="badge badge-blue">
                      <Clock size={12} /> {test.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.5rem", lineHeight: "1.4" }}>
                    {test.title}
                  </h3>

                  <p className="body-sm" style={{ marginBottom: "1.25rem", minHeight: "42px" }}>
                    {test.description}
                  </p>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {test.subjects.map((s) => (
                      <span key={s} className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--hairline)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block" }}>
                      Scoring
                    </span>
                    <strong style={{ fontSize: "0.875rem", color: "var(--ink)" }}>
                      +{test.positiveMarks} / -{test.negativeMarks} ({test.totalMarks} M)
                    </strong>
                  </div>

                  <Link href={`/test/${test.id}`} className="btn btn-primary btn-sm">
                    <Play size={14} />
                    <span>Start Test</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
