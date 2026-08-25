"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";
import { Activity, BookOpen, FileText, Shield, Sparkles, User, LogOut, GraduationCap } from "lucide-react";

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Fetch authenticated session from API
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          localStorage.setItem("love_neet_user", JSON.stringify(data.user));
        } else {
          const saved = localStorage.getItem("love_neet_user");
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              // Ensure old stale demo accounts aren't resurrected
              if (parsed?.name?.includes("Sunita")) {
                localStorage.removeItem("love_neet_user");
                setCurrentUser(null);
              } else {
                setCurrentUser(parsed);
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      })
      .catch(() => {
        const saved = localStorage.getItem("love_neet_user");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed?.name?.includes("Sunita")) {
              localStorage.removeItem("love_neet_user");
              setCurrentUser(null);
            } else {
              setCurrentUser(parsed);
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("love_neet_user");
    setCurrentUser(null);
    window.location.href = "/auth";
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--hairline)",
        height: "68px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 2px 8px rgba(2, 132, 199, 0.3)"
            }}
          >
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--ink)", letterSpacing: "-0.03em" }}>
                Love<span style={{ color: "var(--primary)" }}>NEET</span>
              </span>
              <span className="badge badge-teal" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                NTA 2026
              </span>
            </div>
            <span style={{ fontSize: "0.6875rem", color: "var(--mute)", fontWeight: "500" }}>
              Medical Entrance Test Series & AI Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--body)",
              padding: "0.4rem 0.6rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            <BookOpen size={16} />
            <span>Test Series</span>
          </Link>

          <Link
            href="/college-predictor"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#0f766e",
              padding: "0.4rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(15, 118, 110, 0.08)"
            }}
          >
            <Sparkles size={16} color="#0f766e" />
            <span>College Predictor</span>
          </Link>

          <Link
            href="/admin/upload-pdf"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--teal)",
              padding: "0.4rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--teal-light)"
            }}
          >
            <FileText size={16} />
            <span>PDF to MCQ</span>
          </Link>

          <Link
            href="/admin"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--body)",
              padding: "0.4rem 0.6rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            <Shield size={16} />
            <span>Faculty Suite</span>
          </Link>
        </nav>

        {/* User Authentication & Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.75rem",
                  backgroundColor: "var(--canvas-soft-2)",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--hairline)"
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: currentUser.role === "admin" ? "var(--ink)" : "var(--primary)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: "700"
                  }}
                >
                  {currentUser.role === "admin" ? "F" : "C"}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--ink)", lineHeight: 1.2 }}>
                    {currentUser.name}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--mute)", fontWeight: "500" }}>
                    {currentUser.role === "admin" ? "Faculty / Admin" : "Candidate (Aspirant)"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                style={{ padding: "0.45rem 0.65rem", color: "var(--mute)" }}
                title="Log Out"
              >
                <LogOut size={14} />
                <span style={{ fontSize: "0.75rem" }}>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link
                href="/auth?role=candidate"
                className="btn btn-primary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
              >
                <GraduationCap size={15} />
                <span>Candidate Login</span>
              </Link>
              <Link
                href="/auth?role=admin"
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
              >
                <Shield size={14} />
                <span>Faculty Portal</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
