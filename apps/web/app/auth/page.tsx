"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
  Zap
} from "lucide-react";
import { UserRole } from "@/lib/types";

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("candidate@example.com");
  const [password, setPassword] = useState("neet2026pass");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("candidate");
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? { name, email, password, role, targetYear }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setSuccess(data.message || "Authenticated successfully!");
      if (data.user) {
        localStorage.setItem("love_neet_user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        if (data.user?.role === "admin") {
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

  const loginAsDemo = async (demoRole: UserRole) => {
    setError("");
    setLoading(true);
    const demoEmail = demoRole === "admin" ? "admin@example.com" : "candidate@example.com";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail })
      });

      const data = await res.json();
      if (data.user) {
        localStorage.setItem("love_neet_user", JSON.stringify(data.user));
        if (demoRole === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (e: any) {
      console.error(e);
      // Fallback
      const fallback =
        demoRole === "admin"
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
      localStorage.setItem("love_neet_user", JSON.stringify(fallback));
      router.push(demoRole === "admin" ? "/admin" : "/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "4rem 0 6rem", flex: 1, display: "flex", alignItems: "center", backgroundColor: "var(--canvas-soft)", minHeight: "85vh" }}>
        <div className="container" style={{ maxWidth: "490px" }}>
          <div className="card" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-2)" }}>
            {/* Logo and Heading */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  margin: "0 auto 1rem",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)"
                }}
              >
                <Activity size={28} />
              </div>
              <h1 className="display-sm" style={{ color: "var(--ink)", marginBottom: "0.4rem" }}>
                {isRegister ? "Create NEET Account" : "Sign In to LoveNEET"}
              </h1>
              <p className="body-sm">
                {isRegister
                  ? "Join the premier AI-powered test series with authentic NTA simulation."
                  : "Access your 180Q mock test booklets, NCERT citations & AI variations."}
              </p>
            </div>

            {/* Quick Demo Access Bar */}
            <div
              style={{
                backgroundColor: "var(--canvas-soft-2)",
                padding: "1.1rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.75rem",
                textAlign: "center",
                border: "1px solid var(--hairline)"
              }}
            >
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.65rem", fontSize: "0.72rem" }}>
                ⚡ 1-CLICK QUICK DEMO SIGN IN
              </span>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button
                  type="button"
                  onClick={() => loginAsDemo("candidate")}
                  disabled={loading}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, backgroundColor: "#ffffff", fontWeight: "700" }}
                >
                  <User size={14} color="var(--primary)" />
                  <span>Candidate Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo("admin")}
                  disabled={loading}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, backgroundColor: "#ffffff", fontWeight: "700" }}
                >
                  <Shield size={14} color="var(--teal)" />
                  <span>Admin / Faculty</span>
                </button>
              </div>
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
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {isRegister && (
                <div className="form-control">
                  <label className="form-label" style={{ fontWeight: "700" }}>Full Name</label>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Aakash Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-text"
                      style={{ paddingLeft: "2.4rem" }}
                    />
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="form-label" style={{ fontWeight: "700" }}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--mute)" }} />
                  <input
                    type="email"
                    required
                    placeholder="candidate@example.com"
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
                    placeholder="Enter at least 6 characters"
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

              {isRegister && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div className="form-control">
                    <label className="form-label" style={{ fontWeight: "700" }}>Account Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="select-input"
                    >
                      <option value="candidate">Candidate (Student)</option>
                      <option value="admin">Admin (Faculty)</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="form-label" style={{ fontWeight: "700" }}>Target Exam</label>
                    <select
                      value={targetYear}
                      onChange={(e) => setTargetYear(Number(e.target.value))}
                      className="select-input"
                    >
                      <option value={2026}>NEET 2026</option>
                      <option value={2027}>NEET 2027</option>
                      <option value={2028}>NEET 2028</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                <span>{loading ? "Authenticating..." : isRegister ? "Create Account & Start" : "Secure Sign In"}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Switch Mode Toggle */}
            <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--body)" }}>
              {isRegister ? (
                <>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setError("");
                    }}
                    style={{ border: "none", background: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setError("");
                    }}
                    style={{ border: "none", background: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}
                  >
                    Register New Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
