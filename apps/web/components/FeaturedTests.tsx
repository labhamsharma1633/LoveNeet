"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Layers } from "lucide-react";
import { TestConfig } from "@/lib/types";

const INITIAL_FALLBACK_TESTS: Partial<TestConfig>[] = [
  {
    id: "test-neet-grand-01",
    title: "All-India NEET Mock Test 2025 (Full Syllabus — NTA Pattern)",
    code: "NEET-GT-2025-01",
    description: "Authentic NTA NEET pattern mock test covering Physics, Chemistry, Botany, and Zoology with detailed clinical solutions, negative marking (+4 / -1), and real-time percentile ranking.",
    pattern: "NTA_NEET_2025",
    durationMinutes: 200,
    totalMarks: 720,
    positiveMarks: 4,
    negativeMarks: 1,
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"]
  },
  {
    id: "test-human-physio-02",
    title: "NEET High-Yield: Human Physiology & Clinical Cardiology",
    code: "NEET-UNIT-BIO-02",
    description: "Specialized high-yield unit test focusing on Cardiac cycle, ECG interpretation, Neural impulse transmission, and Endocrine feedback loops.",
    pattern: "UNIT_TEST",
    durationMinutes: 45,
    totalMarks: 20,
    positiveMarks: 4,
    negativeMarks: 1,
    subjects: ["Zoology"]
  },
  {
    id: "test-physics-circuits-03",
    title: "NEET Physics Rapid Sprint: Current Electricity & Optics",
    code: "NEET-UNIT-PHY-03",
    description: "Rigorous problem sets covering Wheatstone bridges, Kirchhoff's laws, potentiometer sensitivity, and optical microscope magnification.",
    pattern: "UNIT_TEST",
    durationMinutes: 30,
    totalMarks: 8,
    positiveMarks: 4,
    negativeMarks: 1,
    subjects: ["Physics"]
  }
];

export function FeaturedTests() {
  const [tests, setTests] = useState<any[]>(INITIAL_FALLBACK_TESTS);

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

    fetch("/api/tests")
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
        if (combined.length > 0) {
          setTests(combined);
        }
      })
      .catch((err) => {
        console.error(err);
        if (customTests.length > 0) {
          const combined = [
            ...customTests,
            ...INITIAL_FALLBACK_TESTS.filter((dt) => !customTests.some((ct) => ct.id === dt.id))
          ];
          setTests(combined);
        }
      });
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
      {tests.map((test) => (
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
              <span className="badge badge-blue">
                <Clock size={12} /> {test.durationMinutes} Minutes
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--ink)", marginBottom: "0.75rem", lineHeight: "1.4" }}>
              {test.title}
            </h3>

            <p className="body-sm" style={{ marginBottom: "1.5rem" }}>
              {test.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {test.subjects?.map((s: string) => (
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
  );
}
