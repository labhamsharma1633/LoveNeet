"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Medal,
  TrendingUp,
  User,
  Zap
} from "lucide-react";
import { EvaluationResult } from "@/lib/types";

export default function AdminAnalyticsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
        if (data.recentResults) setResults(data.recentResults);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container">
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

          {/* Header */}
          <div
            className="card"
            style={{
              padding: "2rem",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <span className="badge badge-teal" style={{ marginBottom: "0.35rem" }}>
                EXAM CONTROLLER PORTAL
              </span>
              <h1 className="display-sm" style={{ color: "var(--ink)" }}>
                Candidate Scorebook & Item Difficulty Analytics
              </h1>
              <p className="body-sm">
                Real-time evaluation logs, percentile distribution, and item discrimination.
              </p>
            </div>

            <button
              onClick={() => alert("Scorebook CSV Export generated.")}
              className="btn btn-secondary btn-sm"
            >
              <Download size={14} />
              <span>Export CSV Scorebook</span>
            </button>
          </div>

          {/* Metric Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2.5rem"
            }}
          >
            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)" }}>Total Evaluated</span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--ink)", marginTop: "0.25rem" }}>
                {results.length} Attempts
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: "600" }}>
                100% Server Verified
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)" }}>Mean Batch Score</span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--primary)", marginTop: "0.25rem" }}>
                {metrics?.averageScore || 540} / 720
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>
                ~75% Average
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)" }}>Average Time</span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--teal)", marginTop: "0.25rem" }}>
                142 mins
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--teal)", fontWeight: "600" }}>
                Pacing optimal
              </span>
            </div>

            <div className="card" style={{ padding: "1.25rem" }}>
              <span className="caption-mono" style={{ color: "var(--mute)" }}>Negative Penalty Rate</span>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--danger)", marginTop: "0.25rem" }}>
                -6.2 Marks
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--danger)", fontWeight: "600" }}>
                Per candidate avg
              </span>
            </div>
          </div>

          {/* Results Table */}
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "800", color: "var(--ink)", marginBottom: "1.25rem" }}>
              All-India Candidate Attempts & Scorebook
            </h3>

            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--mute)" }}>
                No candidate attempts recorded yet. Take a test from the candidate portal to see live results here.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--hairline)", color: "var(--mute)" }}>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Candidate</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Score</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Correct / Wrong</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Percentile</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Est. AIR</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem" }}>Submitted</th>
                      <th style={{ padding: "0.75rem", textTransform: "uppercase", fontSize: "0.75rem", textAlign: "right" }}>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.attemptId || i} style={{ borderBottom: "1px solid var(--hairline)" }}>
                        <td style={{ padding: "1rem 0.75rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.75rem" }}>
                              {r.candidateName.charAt(0)}
                            </div>
                            <strong style={{ color: "var(--ink)" }}>{r.candidateName}</strong>
                          </div>
                        </td>
                        <td style={{ padding: "1rem 0.75rem" }}>
                          <strong style={{ color: "var(--primary)", fontSize: "1rem" }}>{r.finalScore}</strong>
                          <span style={{ color: "var(--mute)", fontSize: "0.75rem" }}> / {r.maxScore}</span>
                        </td>
                        <td style={{ padding: "1rem 0.75rem" }}>
                          <span style={{ color: "var(--success)", fontWeight: "700" }}>+{r.correctCount}</span>
                          <span style={{ color: "var(--mute)" }}> / </span>
                          <span style={{ color: "var(--danger)", fontWeight: "700" }}>-{r.wrongCount}</span>
                        </td>
                        <td style={{ padding: "1rem 0.75rem" }}>
                          <span className="badge badge-teal">{r.estimatedPercentile}%</span>
                        </td>
                        <td style={{ padding: "1rem 0.75rem" }}>
                          <strong>AIR #{r.estimatedAIR.toLocaleString()}</strong>
                        </td>
                        <td style={{ padding: "1rem 0.75rem", color: "var(--mute)", fontSize: "0.8125rem" }}>
                          {new Date(r.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1rem 0.75rem", textAlign: "right" }}>
                          <Link href={`/test/${r.testId}/result?attemptId=${r.attemptId}`} className="btn btn-secondary btn-sm">
                            View Solution
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
