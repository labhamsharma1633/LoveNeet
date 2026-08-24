"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { TestConfig, UserProfile } from "@/lib/types";

export default function TestInstructionsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [test, setTest] = useState<TestConfig | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("love_neet_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    fetch(`/api/tests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.test) setTest(data.test);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleStartTest = async () => {
    if (!pledgeAccepted || !test) return;
    setStarting(true);

    try {
      const candId = user?.id || "user-cand-01";
      const candName = user?.name || "Medical Aspirant";

      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          candidateId: candId,
          candidateName: candName
        })
      });

      const data = await res.json();
      if (data.attempt) {
        router.push(`/test/${test.id}/take?attemptId=${data.attempt.id}`);
      }
    } catch (err) {
      console.error(err);
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "4rem 0", textAlign: "center" }}>
          <div className="container">Loading examination details...</div>
        </main>
      </>
    );
  }

  if (!test) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "4rem 0", textAlign: "center" }}>
          <div className="container">
            <h2>Test Not Found</h2>
            <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Back to Dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 4rem", backgroundColor: "var(--canvas-soft)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <Link
              href="/dashboard"
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
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="card" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)" }}>
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: "1.5rem", marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span className="badge badge-teal">{test.pattern}</span>
                <span className="badge badge-blue">Code: {test.code}</span>
              </div>
              <h1 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.5rem" }}>
                {test.title}
              </h1>
              <p className="body-md">{test.description}</p>
            </div>

            {/* Test Specification Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "1rem",
                backgroundColor: "var(--canvas-soft-2)",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "2rem"
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block", textTransform: "uppercase", fontWeight: "700" }}>
                  Duration
                </span>
                <strong style={{ fontSize: "1.25rem", color: "var(--ink)" }}>
                  {test.durationMinutes} Minutes
                </strong>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block", textTransform: "uppercase", fontWeight: "700" }}>
                  Questions
                </span>
                <strong style={{ fontSize: "1.25rem", color: "var(--ink)" }}>
                  {test.totalQuestions} MCQs
                </strong>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block", textTransform: "uppercase", fontWeight: "700" }}>
                  Marking Scheme
                </span>
                <strong style={{ fontSize: "1.25rem", color: "var(--success)" }}>
                  +{test.positiveMarks} / -{test.negativeMarks}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block", textTransform: "uppercase", fontWeight: "700" }}>
                  Total Maximum
                </span>
                <strong style={{ fontSize: "1.25rem", color: "var(--primary)" }}>
                  {test.totalMarks} Marks
                </strong>
              </div>
            </div>

            {/* Instructions List */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "var(--ink)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookOpen size={18} color="var(--primary)" />
                <span>NTA NEET Examination Instructions</span>
              </h3>

              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.25rem", fontSize: "0.925rem", color: "var(--body)", lineHeight: "1.55" }}>
                {test.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
                <li>
                  The test timer is anchored to the server clock. When the remaining time hits 00:00:00, the examination will automatically submit.
                </li>
                <li>
                  Responses are continuously saved in the background. If you accidentally close or refresh the tab, your answers remain safe and you can resume immediately.
                </li>
              </ul>
            </div>

            {/* Question Palette Meaning */}
            <div
              style={{
                backgroundColor: "var(--canvas-soft-2)",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "2rem",
                border: "1px solid var(--hairline)"
              }}
            >
              <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "var(--ink)", marginBottom: "0.85rem" }}>
                Question Palette Color Legend
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", fontSize: "0.8125rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div className="palette-btn palette-not-visited" style={{ width: "26px", height: "26px" }}>1</div>
                  <span>Not Visited</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div className="palette-btn palette-visited" style={{ width: "26px", height: "26px" }}>2</div>
                  <span>Visited / Unanswered</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div className="palette-btn palette-answered" style={{ width: "26px", height: "26px" }}>3</div>
                  <span>Answered</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div className="palette-btn palette-marked" style={{ width: "26px", height: "26px" }}>4</div>
                  <span>Marked for Review</span>
                </div>
              </div>
            </div>

            {/* Candidate Pledge & Checkbox */}
            <div
              style={{
                padding: "1.25rem",
                backgroundColor: pledgeAccepted ? "var(--primary-surface)" : "var(--canvas)",
                border: `2px solid ${pledgeAccepted ? "var(--primary)" : "var(--hairline-strong)"}`,
                borderRadius: "var(--radius-md)",
                marginBottom: "2rem",
                transition: "all 0.15s ease"
              }}
            >
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  style={{ width: "20px", height: "20px", marginTop: "2px", accentColor: "var(--primary)" }}
                />
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--ink)", lineHeight: "1.5" }}>
                  I have read and understood all the instructions above. I understand that negative marking is applicable and that tab switching is monitored. I am ready to begin the examination.
                </span>
              </label>
            </div>

            {/* Launch Button */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleStartTest}
                disabled={!pledgeAccepted || starting}
                className="btn btn-primary btn-lg"
                style={{ minWidth: "220px", opacity: pledgeAccepted ? 1 : 0.6 }}
              >
                <span>{starting ? "Initializing Environment..." : "I am Ready to Begin"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
