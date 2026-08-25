"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
  BookOpen
} from "lucide-react";
import { UserRole } from "@/lib/types";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role");

  const [activePortal, setActivePortal] = useState<UserRole>(
    initialRoleParam === "admin" ? "admin" : "candidate"
  );
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialRoleParam === "admin") {
      setActivePortal("admin");
    } else if (initialRoleParam === "candidate") {
      setActivePortal("candidate");
    }
  }, [initialRoleParam]);

  const handlePortalSwitch = (portal: UserRole) => {
    setActivePortal(portal);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? {
            name: name.trim(),
            email: email.trim(),
            password,
            role: activePortal,
            targetYear
          }
        : { email: email.trim(), password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      setSuccess(data.message || "Authenticated successfully!");
      if (data.user) {
        localStorage.setItem("love_neet_user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        if (data.user?.role === "admin" || activePortal === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-2)" }}>
      {/* Brand Icon & Heading */}
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: activePortal === "admin"
              ? "linear-gradient(135deg, #0f172a 0%, #334155 100%)"
              : "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            margin: "0 auto 1rem",
            boxShadow: activePortal === "admin"
              ? "0 4px 14px rgba(15, 23, 42, 0.3)"
              : "0 4px 14px rgba(2, 132, 199, 0.3)"
          }}
        >
          {activePortal === "admin" ? <Shield size={28} /> : <GraduationCap size={28} />}
        </div>
        <h1 className="display-sm" style={{ color: "var(--ink)", marginBottom: "0.35rem" }}>
          {activePortal === "admin"
            ? (isRegister ? "Faculty Account Registration" : "Faculty & Admin Portal")
            : (isRegister ? "Candidate Registration" : "Candidate / Student Login")}
        </h1>
        <p className="body-sm">
          {activePortal === "admin"
            ? "Manage AI OCR question papers, audit test series, and analyze student performances."
            : "Attempt full 180Q NTA mock tests with NCERT citations, +4/-1 marking & live timer."}
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: "var(--canvas-soft-2)",
          padding: "0.3rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--hairline)",
          marginBottom: "1.75rem"
        }}
      >
        <button
          type="button"
          onClick={() => handlePortalSwitch("candidate")}
          style={{
            border: "none",
            backgroundColor: activePortal === "candidate" ? "#ffffff" : "transparent",
            color: activePortal === "candidate" ? "var(--primary)" : "var(--mute)",
            fontWeight: "700",
            fontSize: "0.85rem",
            padding: "0.55rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            boxShadow: activePortal === "candidate" ? "var(--shadow-1)" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            transition: "all 0.15s ease"
          }}
        >
          <GraduationCap size={16} />
          <span>Candidate (Aspirant)</span>
        </button>

        <button
          type="button"
          onClick={() => handlePortalSwitch("admin")}
          style={{
            border: "none",
            backgroundColor: activePortal === "admin" ? "var(--ink)" : "transparent",
            color: activePortal === "admin" ? "#ffffff" : "var(--mute)",
            fontWeight: "700",
            fontSize: "0.85rem",
            padding: "0.55rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            boxShadow: activePortal === "admin" ? "var(--shadow-1)" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            transition: "all 0.15s ease"
          }}
        >
          <Shield size={16} />
          <span>Faculty / Admin</span>
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "var(--danger-light)",
            color: "var(--danger)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            fontWeight: "600",
            marginBottom: "1.25rem"
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "var(--success-light)",
            color: "#065f46",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
        >
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
        {isRegister && (
          <div className="form-control">
            <label className="form-label" style={{ fontWeight: "700" }}>
              {activePortal === "admin" ? "Faculty Full Name & Title" : "Full Name"}
            </label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
              <input
                type="text"
                required
                placeholder={activePortal === "admin" ? "e.g. Dr. Rajesh Verma (HOD)" : "e.g. Ananya Sen"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-text"
                style={{ paddingLeft: "2.4rem" }}
              />
            </div>
          </div>
        )}

        <div className="form-control">
          <label className="form-label" style={{ fontWeight: "700" }}>
            {activePortal === "admin" ? "Institutional / Faculty Email" : "Email Address"}
          </label>
          <div style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
            <input
              type="email"
              required
              placeholder={activePortal === "admin" ? "faculty@institution.edu" : "student@example.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
              style={{ paddingLeft: "2.4rem" }}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="form-label" style={{ fontWeight: "700" }}>Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              style={{ paddingLeft: "2.4rem", paddingRight: "2.4rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--mute)",
                padding: "0.2rem"
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {isRegister && activePortal === "candidate" && (
          <div className="form-control">
            <label className="form-label" style={{ fontWeight: "700" }}>Target NEET Examination</label>
            <select
              value={targetYear}
              onChange={(e) => setTargetYear(Number(e.target.value))}
              className="select-input"
            >
              <option value={2026}>NEET 2026 (Target MBBS)</option>
              <option value={2027}>NEET 2027 (Class 11 / Two-Year Batch)</option>
              <option value={2028}>NEET 2028 (Foundation Batch)</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={activePortal === "admin" ? "btn btn-secondary btn-lg" : "btn btn-primary btn-lg"}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            backgroundColor: activePortal === "admin" ? "var(--ink)" : undefined,
            color: activePortal === "admin" ? "#ffffff" : undefined
          }}
        >
          <span>
            {loading
              ? "Authenticating..."
              : isRegister
              ? `Create ${activePortal === "admin" ? "Faculty" : "Candidate"} Account`
              : `Sign In to ${activePortal === "admin" ? "Faculty Suite" : "Candidate Portal"}`}
          </span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Switch Sign In vs Sign Up Mode */}
      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--body)" }}>
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError("");
                setSuccess("");
              }}
              style={{ border: "none", background: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account yet?{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError("");
                setSuccess("");
              }}
              style={{ border: "none", background: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}
            >
              Create New Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "4rem 0 6rem", flex: 1, display: "flex", alignItems: "center", backgroundColor: "var(--canvas-soft)", minHeight: "85vh" }}>
        <div className="container" style={{ maxWidth: "510px" }}>
          <Suspense fallback={<div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>Loading portal...</div>}>
            <AuthForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
