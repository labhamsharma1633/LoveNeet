import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Cpu,
  FileCheck2,
  GraduationCap,
  Layers,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Zap
} from "lucide-react";
import { DEFAULT_TESTS } from "@/lib/neet-data";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main style={{ position: "relative", overflow: "hidden" }}>
        <div className="clinical-glow" />

        {/* ─── HERO SECTION ─── */}
        <section style={{ padding: "4.5rem 0 3.5rem", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                alignItems: "center",
                gap: "3.5rem"
              }}
            >
              {/* Left Column: Value Prop */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.85rem",
                    backgroundColor: "var(--primary-light)",
                    borderRadius: "var(--radius-pill)",
                    color: "var(--primary-hover)",
                    fontSize: "0.8125rem",
                    fontWeight: "700",
                    marginBottom: "1.25rem",
                    boxShadow: "var(--shadow-1)"
                  }}
                >
                  <Sparkles size={16} />
                  <span>AI-POWERED NEET 2026 TEST SERIES & PDF ENGINE</span>
                </div>

                <h1 className="display-xl" style={{ color: "var(--ink)", marginBottom: "1.25rem" }}>
                  The Medical Test Series Platform Built for{" "}
                  <span style={{ color: "var(--primary)", textDecoration: "underline", textDecorationColor: "var(--teal)" }}>
                    Future Doctors.
                  </span>
                </h1>

                <p className="body-lg" style={{ marginBottom: "2rem", maxWidth: "560px" }}>
                  Transform raw problem-set PDFs into full-fledged, high-precision NTA NEET mock tests. Practice with real-time countdown timers, negative marking analytics, clinical diagrams, and step-by-step solutions.
                </p>

                {/* CTA Cluster */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <Link href={`/test/${DEFAULT_TESTS[0].id}`} className="btn btn-primary btn-lg">
                    <span>Take Free Grand Mock</span>
                    <ArrowRight size={18} />
                  </Link>

                  <Link href="/admin/upload-pdf" className="btn btn-teal btn-lg">
                    <Sparkles size={18} />
                    <span>Upload Problem PDF</span>
                  </Link>

                  <Link href="/dashboard" className="btn btn-secondary btn-lg">
                    <BookOpen size={18} />
                    <span>Explore All Tests</span>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--hairline)",
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", fontWeight: "600", color: "var(--body)" }}>
                    <ShieldCheck size={18} color="var(--primary)" />
                    <span>NTA NEET 200-Min Pattern</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", fontWeight: "600", color: "var(--body)" }}>
                    <CheckCircle size={18} color="var(--teal)" />
                    <span>+4 / -1 Marking Engine</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", fontWeight: "600", color: "var(--body)" }}>
                    <Award size={18} color="var(--success)" />
                    <span>AIIMS & GMC Benchmark</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Graphic */}
              <div style={{ position: "relative" }}>
                <div
                  className="card animate-float"
                  style={{
                    overflow: "hidden",
                    borderRadius: "var(--radius-xl)",
                    border: "2px solid var(--primary-light)",
                    boxShadow: "var(--shadow-5)"
                  }}
                >
                  <img
                    src="/images/hero-banner.jpg"
                    alt="Love NEET Medical Aspirants & Test Platform"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(8px)",
                      borderTop: "1px solid var(--hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "800", color: "var(--ink)" }}>
                        All-India Grand Mock Test 2025
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--mute)" }}>
                        Physics • Chemistry • Botany • Zoology (720 Marks)
                      </div>
                    </div>
                    <Link href={`/test/${DEFAULT_TESTS[0].id}`} className="btn btn-primary btn-sm">
                      Start Test
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PLATFORM PILLARS (WAT & MEDICAL INTEGRITY) ─── */}
        <section style={{ padding: "4rem 0", backgroundColor: "var(--canvas)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
              <span className="caption-mono" style={{ color: "var(--primary)", display: "block", marginBottom: "0.5rem" }}>
                CLINICAL PRECISION & RELIABILITY
              </span>
              <h2 className="display-lg" style={{ color: "var(--ink)", marginBottom: "1rem" }}>
                Engineered for Test Integrity & Score Maximization
              </h2>
              <p className="body-md">
                Every feature in Love NEET is built to mirror authentic medical entrance conditions, ensuring students develop timing discipline and conceptual mastery.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.75rem"
              }}
            >
              {/* Feature 1 */}
              <div className="card" style={{ padding: "2rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <Cpu size={26} />
                </div>
                <h3 className="display-sm" style={{ marginBottom: "0.75rem", color: "var(--ink)" }}>
                  AI PDF to MCQ Parser
                </h3>
                <p className="body-sm">
                  Upload raw problem-set PDFs. Our multi-stage pipeline extracts questions, crops high-resolution biological diagrams, identifies 4 options, and prepares them for admin review.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card" style={{ padding: "2rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "var(--teal-light)",
                    color: "var(--teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <Clock size={26} />
                </div>
                <h3 className="display-sm" style={{ marginBottom: "0.75rem", color: "var(--ink)" }}>
                  Server-Synchronized Timer
                </h3>
                <p className="body-sm">
                  Never lose a second to browser crashes. Timers are anchored to backend timestamps with periodic state auto-saving and tamper-proof auto-submission at 0:00.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card" style={{ padding: "2rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "var(--success-light)",
                    color: "var(--success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <Zap size={26} />
                </div>
                <h3 className="display-sm" style={{ marginBottom: "0.75rem", color: "var(--ink)" }}>
                  Negative Marking Analytics
                </h3>
                <p className="body-sm">
                  Calculates positive score (+4) and negative penalties (-1) accurately. Provides deep subject breakdowns across Botany, Zoology, Physics, and Chemistry.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card" style={{ padding: "2rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "var(--purple-light)",
                    color: "var(--purple)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <Microscope size={26} />
                </div>
                <h3 className="display-sm" style={{ marginBottom: "0.75rem", color: "var(--ink)" }}>
                  Clinical Solutions & Notes
                </h3>
                <p className="body-sm">
                  Review every question with step-by-step derivations, NCERT textbook references, and high-yield clinical correlations for medical college entrance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LIVE TEST SERIES CATALOG ─── */}
        <section style={{ padding: "4.5rem 0", backgroundColor: "var(--canvas-soft)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="caption-mono" style={{ color: "var(--teal)", display: "block", marginBottom: "0.5rem" }}>
                  OFFICIAL CURRICULUM
                </span>
                <h2 className="display-lg" style={{ color: "var(--ink)" }}>
                  Featured NEET Mock Tests
                </h2>
              </div>
              <Link href="/dashboard" className="btn btn-secondary btn-sm">
                <span>View Full Test Series</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              {DEFAULT_TESTS.map((test) => (
                <div
                  key={test.id}
                  className="card"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span className="badge badge-teal">{test.pattern}</span>
                      <span className="badge badge-blue">{test.durationMinutes} Minutes</span>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                      {test.title}
                    </h3>

                    <p className="body-sm" style={{ marginBottom: "1.5rem" }}>
                      {test.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                      {test.subjects.map((s) => (
                        <span key={s} className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: "1.25rem",
                      borderTop: "1px solid var(--hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--mute)", display: "block" }}>
                        Total Marks
                      </span>
                      <strong style={{ fontSize: "1.125rem", color: "var(--ink)" }}>
                        {test.totalMarks} Marks
                      </strong>
                    </div>

                    <Link href={`/test/${test.id}`} className="btn btn-primary btn-sm">
                      <span>View Test</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CALL TO ACTION BAND ─── */}
        <section
          style={{
            padding: "5rem 0",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff"
          }}
        >
          <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "14px",
                backgroundColor: "rgba(2, 132, 199, 0.2)",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem"
              }}
            >
              <Stethoscope size={30} />
            </div>

            <h2 className="display-lg" style={{ color: "#ffffff", marginBottom: "1rem" }}>
              Ready to Accelerate Your Medical Entrance Preparation?
            </h2>

            <p style={{ fontSize: "1.125rem", color: "#94a3b8", lineHeight: "1.6", marginBottom: "2.5rem" }}>
              Join thousands of aspiring MBBS candidates. Practice with realistic NTA simulated tests, review in-depth answer keys, and boost your NEET score today.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href={`/test/${DEFAULT_TESTS[0].id}`} className="btn btn-primary btn-lg">
                <span>Start Practice Now</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/admin/upload-pdf" className="btn btn-secondary btn-lg">
                <span>Admin PDF Extraction</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
