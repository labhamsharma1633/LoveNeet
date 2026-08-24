import Link from "next/link";
import { Activity, ShieldCheck, Heart, Award, FileCode } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        backgroundColor: "var(--canvas)",
        borderTop: "1px solid var(--hairline)",
        padding: "3.5rem 0 2rem"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem"
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}
              >
                <Activity size={18} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: "800", color: "var(--ink)" }}>
                Love<span style={{ color: "var(--primary)" }}>NEET</span>
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--body)", lineHeight: "1.6", marginBottom: "1rem" }}>
              The high-precision medical entrance test series platform. Converting complex PDF problem sets into structured MCQs with clinical solutions and NTA simulation.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--teal)", fontSize: "0.8125rem", fontWeight: "600" }}>
              <ShieldCheck size={16} />
              <span>NTA NEET 2026 Ready</span>
            </div>
          </div>

          {/* Test Series */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "1rem" }}>
              Test Series
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.875rem", color: "var(--body)" }}>
              <li><Link href="/dashboard">Full Syllabus Grand Mock (720 Marks)</Link></li>
              <li><Link href="/dashboard">Human Physiology & Zoology Unit</Link></li>
              <li><Link href="/dashboard">Organic Chemistry Reaction Sprint</Link></li>
              <li><Link href="/dashboard">Physics Mechanics & Current Electricity</Link></li>
              <li><Link href="/dashboard">Botany Genetics & Plant Reproduction</Link></li>
            </ul>
          </div>

          {/* Admin & AI Tools */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "1rem" }}>
              Platform Engine
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.875rem", color: "var(--body)" }}>
              <li><Link href="/admin/upload-pdf">AI PDF Question Extractor</Link></li>
              <li><Link href="/admin/review-questions">MCQ Review & Staging Workbench</Link></li>
              <li><Link href="/admin/create-test">Test Series Scheduler</Link></li>
              <li><Link href="/admin/analytics">Candidate Scorebook & Item Difficulty</Link></li>
              <li><Link href="/admin">Faculty Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Medical Integrity */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "1rem" }}>
              NEET Scoring Rules
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--body)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0.6rem", background: "var(--canvas-soft-2)", borderRadius: "var(--radius-sm)" }}>
                <span>Correct Answer</span>
                <strong style={{ color: "var(--success)" }}>+4 Marks</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0.6rem", background: "var(--canvas-soft-2)", borderRadius: "var(--radius-sm)" }}>
                <span>Incorrect Answer</span>
                <strong style={{ color: "var(--danger)" }}>-1 Negative Mark</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0.6rem", background: "var(--canvas-soft-2)", borderRadius: "var(--radius-sm)" }}>
                <span>Unattempted</span>
                <strong>0 Marks</strong>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--hairline)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.8125rem",
            color: "var(--mute)"
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Love NEET Medical Education Technologies. Designed for Future Doctors.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>Built on WAT Architecture (Workflows, Agent, Tools)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
