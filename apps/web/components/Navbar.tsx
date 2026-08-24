"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";
import { Activity, BookOpen, FileText, LayoutDashboard, Shield, Sparkles, User, LogOut } from "lucide-react";

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // 1. Fetch authenticated session from API
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
              setCurrentUser(JSON.parse(saved));
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
            setCurrentUser(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      });
  }, []);

  const switchRole = async (role: "candidate" | "admin") => {
    const demoEmail = role === "admin" ? "admin@example.com" : "candidate@example.com";
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail })
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem("love_neet_user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        window.location.reload();
        return;
      }
    } catch (err) {
      console.error("Quick switch error:", err);
    }

    // Fallback
    const fallbackUser: UserProfile =
      role === "admin"
        ? {
            id: "user-admin-01",
            name: "Dr. Sunita Deshmukh (Admin / HOD)",
            email: "admin@example.com",
            role: "admin",
            rollNumber: "FACULTY-NEET-01"
          }
        : {
            id: "user-cand-01",
            name: "Dr. Aakash Sharma (Aspirant)",
            email: "candidate@example.com",
            role: "candidate",
            targetYear: 2026,
            rollNumber: "NEET2026-984210"
          };
    localStorage.setItem("love_neet_user", JSON.stringify(fallbackUser));
    setCurrentUser(fallbackUser);
    window.location.reload();
  };

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
        backgroundColor: "rgba(255, 255, 255, 0.94)",
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
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
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
            <span>Admin Suite</span>
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
        </nav>

        {/* User Role Switcher & Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--canvas-soft-2)",
              borderRadius: "var(--radius-pill)",
              padding: "0.2rem",
              border: "1px solid var(--hairline)"
            }}
          >
            <button
              onClick={() => switchRole("candidate")}
              style={{
                border: "none",
                background: currentUser?.role === "candidate" ? "var(--canvas)" : "transparent",
                color: currentUser?.role === "candidate" ? "var(--primary)" : "var(--mute)",
                fontWeight: "700",
                fontSize: "0.75rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-pill)",
                boxShadow: currentUser?.role === "candidate" ? "var(--shadow-1)" : "none",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              Candidate Demo
            </button>
            <button
              onClick={() => switchRole("admin")}
              style={{
                border: "none",
                background: currentUser?.role === "admin" ? "var(--ink)" : "transparent",
                color: currentUser?.role === "admin" ? "#ffffff" : "var(--mute)",
                fontWeight: "700",
                fontSize: "0.75rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-pill)",
                boxShadow: currentUser?.role === "admin" ? "var(--shadow-1)" : "none",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              Admin Demo
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link href="/auth" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <User size={15} />
              <span>{currentUser ? currentUser.name.split(" ")[1] || "Account" : "Sign In"}</span>
            </Link>

            {currentUser && (
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                style={{ padding: "0.35rem 0.6rem", color: "var(--mute)" }}
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
