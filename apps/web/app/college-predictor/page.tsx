"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Filter,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  IndianRupee,
  Layers,
  MapPin,
  Percent,
  Search,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import {
  predictEligibleColleges,
  predictRankAndPercentile,
  TOP_GOVERNMENT_MEDICAL_COLLEGES,
  MedicalCollege
} from "@/lib/college-data";

export default function CollegePredictorPage() {
  const [score, setScore] = useState<number>(660);
  const [category, setCategory] = useState<"general" | "obc" | "ews" | "sc" | "st">("general");
  const [quota, setQuota] = useState<"aiq_15" | "state_85">("aiq_15");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"high" | "borderline" | "dream">("high");

  const prediction = useMemo(() => {
    return predictEligibleColleges(score, category, quota, selectedState);
  }, [score, category, quota, selectedState]);

  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(TOP_GOVERNMENT_MEDICAL_COLLEGES.map((c) => c.state))).sort();
    return ["All", ...states];
  }, []);

  const filterBySearch = (colleges: MedicalCollege[]) => {
    if (!searchQuery.trim()) return colleges;
    const q = searchQuery.toLowerCase();
    return colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  };

  const highChanceFiltered = filterBySearch(prediction.topMatches.highChance);
  const borderlineFiltered = prediction.topMatches.borderline.filter(
    (b) => filterBySearch([b.college]).length > 0
  );
  const dreamFiltered = prediction.topMatches.dream.filter(
    (d) => filterBySearch([d.college]).length > 0
  );

  return (
    <>
      <Navbar />

      <main style={{ padding: "3rem 0 5rem", backgroundColor: "var(--canvas-soft)", minHeight: "85vh" }}>
        <div className="container">
          {/* Header Banner */}
          <div
            style={{
              padding: "2.5rem 2rem",
              background: "linear-gradient(135deg, #0284c7 0%, #0f766e 100%)",
              borderRadius: "var(--radius-xl)",
              color: "#ffffff",
              marginBottom: "2rem",
              boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", backgroundColor: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(4px)", borderRadius: "var(--radius-pill)", fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                <Sparkles size={14} />
                <span>NTA Cutoff & AIR Analytics Model</span>
              </div>
              <h1 className="display-md" style={{ color: "#ffffff", margin: 0, marginBottom: "0.5rem" }}>
                NEET Government Medical College & AIR Predictor
              </h1>
              <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.95rem", margin: 0, maxWidth: "680px" }}>
                Enter your mock test score to instantly predict your <strong>All India Rank (AIR)</strong>, percentile, and admission probability across <strong>AIIMS, MAMC, Central Universities & State GMCs</strong>.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                minWidth: "220px"
              }}
            >
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255, 255, 255, 0.8)", fontWeight: "700" }}>
                Predicted Rank
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#ffffff", marginTop: "0.2rem" }}>
                {prediction.estimatedAirRange}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.9)", marginTop: "0.2rem" }}>
                Percentile: <strong>{prediction.estimatedPercentile}%ile</strong>
              </div>
            </div>
          </div>

          {/* Predictor Controls Grid */}
          <div
            className="card"
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              marginBottom: "2.5rem",
              border: "1px solid var(--hairline)"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              {/* Left Column: Score Slider & Presets */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--ink)" }}>
                    Target / Mock Test Score (out of 720):
                  </label>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      color: "var(--primary)",
                      backgroundColor: "var(--primary-surface)",
                      padding: "0.2rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1.5px solid var(--primary-light)"
                    }}
                  >
                    {score} <span style={{ fontSize: "0.85rem", color: "var(--mute)", fontWeight: "600" }}>/ 720</span>
                  </div>
                </div>

                {/* Score Range Slider */}
                <input
                  type="range"
                  min={300}
                  max={720}
                  step={1}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "4px",
                    accentColor: "var(--primary)",
                    cursor: "pointer",
                    marginBottom: "1rem"
                  }}
                />

                {/* Quick Score Presets */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  {[
                    { label: "710 (AIIMS D)", val: 710 },
                    { label: "680 (Apex)", val: 680 },
                    { label: "650 (Top GMC)", val: 650 },
                    { label: "620 (Core GMC)", val: 620 },
                    { label: "580 (Border)", val: 580 },
                    { label: "520 (State)", val: 520 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setScore(preset.val)}
                      style={{
                        border: score === preset.val ? "1.5px solid var(--primary)" : "1px solid var(--hairline)",
                        backgroundColor: score === preset.val ? "var(--primary-surface)" : "var(--canvas-soft-2)",
                        color: score === preset.val ? "var(--primary)" : "var(--body)",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "var(--radius-pill)",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: "0.8125rem", color: "var(--mute)", lineHeight: "1.4" }}>
                  💡 <em>Status: {prediction.allotmentProbabilityText}</em>
                </div>
              </div>

              {/* Right Column: Category, Quota & State Filters */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Category Selector */}
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--ink)", display: "block", marginBottom: "0.5rem" }}>
                    Reservation Category:
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {(["general", "obc", "ews", "sc", "st"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        style={{
                          border: category === cat ? "1.5px solid var(--teal)" : "1px solid var(--hairline)",
                          backgroundColor: category === cat ? "var(--teal)" : "var(--canvas-soft-2)",
                          color: category === cat ? "#ffffff" : "var(--ink)",
                          padding: "0.45rem 0.85rem",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.8125rem",
                          fontWeight: "700",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {cat === "general" ? "General (UR)" : cat === "obc" ? "OBC-NCL" : cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quota & State Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--ink)", display: "block", marginBottom: "0.5rem" }}>
                      Counseling Quota:
                    </label>
                    <select
                      value={quota}
                      onChange={(e) => setQuota(e.target.value as any)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--hairline-strong)",
                        backgroundColor: "#ffffff",
                        fontSize: "0.8125rem",
                        color: "var(--ink)",
                        fontWeight: "600",
                        outline: "none"
                      }}
                    >
                      <option value="aiq_15">All India Quota (15% AIQ)</option>
                      <option value="state_85">State Quota (85% Home State)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--ink)", display: "block", marginBottom: "0.5rem" }}>
                      State Filter:
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--hairline-strong)",
                        backgroundColor: "#ffffff",
                        fontSize: "0.8125rem",
                        color: "var(--ink)",
                        fontWeight: "600",
                        outline: "none"
                      }}
                    >
                      {uniqueStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section Tabs & Search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setActiveTab("high")}
                className={`btn btn-sm ${activeTab === "high" ? "btn-primary" : "btn-secondary"}`}
                style={{
                  backgroundColor: activeTab === "high" ? "var(--teal)" : undefined,
                  borderColor: activeTab === "high" ? "var(--teal)" : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <CheckCircle2 size={14} />
                <span>High Probability ({prediction.topMatches.highChance.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("borderline")}
                className={`btn btn-sm ${activeTab === "borderline" ? "btn-primary" : "btn-secondary"}`}
                style={{
                  backgroundColor: activeTab === "borderline" ? "#d97706" : undefined,
                  borderColor: activeTab === "borderline" ? "#d97706" : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <TrendingUp size={14} />
                <span>Borderline / Target ({prediction.topMatches.borderline.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("dream")}
                className={`btn btn-sm ${activeTab === "dream" ? "btn-primary" : "btn-secondary"}`}
                style={{
                  backgroundColor: activeTab === "dream" ? "#dc2626" : undefined,
                  borderColor: activeTab === "dream" ? "#dc2626" : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Zap size={14} />
                <span>Dream Colleges & Marks Gap ({prediction.topMatches.dream.length})</span>
              </button>
            </div>

            {/* College Search Input */}
            <div style={{ position: "relative", minWidth: "240px" }}>
              <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
              <input
                type="text"
                placeholder="Search college, city, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem 0.45rem 2.2rem",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--hairline-strong)",
                  fontSize: "0.8125rem",
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* Colleges Card Grid */}
          {activeTab === "high" && (
            <div>
              {highChanceFiltered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#ffffff", borderRadius: "var(--radius-lg)", border: "1px solid var(--hairline)" }}>
                  <HelpCircle size={40} color="var(--mute)" style={{ margin: "0 auto 1rem" }} />
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "var(--ink)" }}>
                    No colleges match this score under High Probability
                  </h3>
                  <p className="body-sm" style={{ marginTop: "0.35rem" }}>
                    Try switching to the <strong>Borderline (±15 Marks)</strong> or <strong>Dream Colleges</strong> tab to see target institutes!
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
                  {highChanceFiltered.map((col) => {
                    const cutoff = col.cutoffs[category] || col.cutoffs.general;
                    const surplus = score - cutoff.minScore;

                    return (
                      <div
                        key={col.id}
                        className="card"
                        style={{
                          padding: "1.5rem",
                          borderRadius: "var(--radius-lg)",
                          border: "1.5px solid #86efac",
                          backgroundColor: "#ffffff",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                            <span className="badge badge-teal" style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}>
                              ✓ Admission Likely (+{surplus} pts)
                            </span>
                            {col.nirfRank && (
                              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--primary)" }}>
                                NIRF #{col.nirfRank}
                              </span>
                            )}
                          </div>

                          <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.25rem", lineHeight: "1.3" }}>
                            {col.shortName}
                          </h3>
                          <div style={{ fontSize: "0.78rem", color: "var(--mute)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <MapPin size={12} />
                            <span>{col.city}, {col.state}</span>
                            <span>•</span>
                            <span>{col.type}</span>
                          </div>

                          {/* Highlights */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1rem" }}>
                            {col.highlights.map((h, i) => (
                              <div key={i} style={{ fontSize: "0.75rem", color: "var(--body)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--teal)" }} />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom Meta */}
                        <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                          <div>
                            <span style={{ color: "var(--mute)" }}>MBBS Seats: </span>
                            <strong>{col.totalSeats}</strong>
                          </div>
                          <div>
                            <span style={{ color: "var(--mute)" }}>Annual Fee: </span>
                            <strong style={{ color: "#166534" }}>₹{col.annualFeeInr.toLocaleString()}/yr</strong>
                          </div>
                          <div>
                            <span style={{ color: "var(--mute)" }}>Closing AIR: </span>
                            <strong>~{cutoff.closingAir.toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Borderline / Target Colleges Tab */}
          {activeTab === "borderline" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {borderlineFiltered.map(({ college: col, markDiff }) => {
                const cutoff = col.cutoffs[category] || col.cutoffs.general;

                return (
                  <div
                    key={col.id}
                    className="card"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "var(--radius-lg)",
                      border: "1.5px solid #fde68a",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span className="badge" style={{ backgroundColor: "#fef3c7", color: "#92400e", fontSize: "0.7rem", padding: "0.2rem 0.6rem", fontWeight: "700" }}>
                          ⚡ Target Borderline ({markDiff} pts)
                        </span>
                        {col.nirfRank && (
                          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--primary)" }}>
                            NIRF #{col.nirfRank}
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.25rem", lineHeight: "1.3" }}>
                        {col.shortName}
                      </h3>
                      <div style={{ fontSize: "0.78rem", color: "var(--mute)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <MapPin size={12} />
                        <span>{col.city}, {col.state}</span>
                      </div>

                      <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "var(--canvas-soft-2)", borderRadius: "var(--radius-xs)", fontSize: "0.78rem", color: "#92400e", marginBottom: "1rem" }}>
                        Aim for <strong>+{Math.abs(markDiff)} more marks</strong> (approx 3 to 4 more correct MCQs) in mock tests to secure this seat safely.
                      </div>
                    </div>

                    <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                      <span>Seats: <strong>{col.totalSeats}</strong></span>
                      <span>Cutoff: <strong>{cutoff.minScore} Marks</strong></span>
                      <span>Closing AIR: <strong>~{cutoff.closingAir.toLocaleString()}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dream Colleges & Marks Gap Analyzer Tab */}
          {activeTab === "dream" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {dreamFiltered.map(({ college: col, marksNeeded }) => {
                const cutoff = col.cutoffs[category] || col.cutoffs.general;
                const physicsBonus = Math.ceil(marksNeeded / 4);

                return (
                  <div
                    key={col.id}
                    className="card"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "var(--radius-lg)",
                      border: "1.5px solid #fecaca",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span className="badge badge-red" style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}>
                          🎯 Dream Tier ({col.tier.split(" ")[0]})
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#dc2626" }}>
                          +{marksNeeded} Marks Needed
                        </span>
                      </div>

                      <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.25rem", lineHeight: "1.3" }}>
                        {col.shortName}
                      </h3>
                      <div style={{ fontSize: "0.78rem", color: "var(--mute)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <MapPin size={12} />
                        <span>{col.city}, {col.state}</span>
                      </div>

                      {/* Marks Improvement Strategy */}
                      <div style={{ padding: "0.75rem", backgroundColor: "#fef2f2", borderRadius: "var(--radius-xs)", borderLeft: "3.5px solid #ef4444", fontSize: "0.78rem", color: "#991b1b", marginBottom: "1rem" }}>
                        <strong>Score Strategy:</strong> Convert <strong>~{physicsBonus} incorrect MCQs into correct answers</strong> (+{marksNeeded} net marks) in Physics/Chemistry to hit the {cutoff.minScore}+ cutoff benchmark.
                      </div>
                    </div>

                    <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                      <span>MBBS Seats: <strong>{col.totalSeats}</strong></span>
                      <span>Target Cutoff: <strong>{cutoff.minScore}</strong></span>
                      <span>Target AIR: <strong>#{cutoff.closingAir.toLocaleString()}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Action Card */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--hairline)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--ink)", margin: 0, marginBottom: "0.25rem" }}>
                Ready to boost your score to reach your dream college?
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--body)", margin: 0 }}>
                Practice authentic 180-question full syllabus mock tests with AI Question Variations & NCERT line citations.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/test/test-yakeen-neet-2027-pt01" className="btn btn-primary btn-md">
                <HeartPulse size={16} />
                <span>Take 180Q Full Mock Test</span>
              </Link>
              <Link href="/dashboard" className="btn btn-secondary btn-md">
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
