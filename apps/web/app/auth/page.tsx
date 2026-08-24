"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Activity, ArrowRight, Check, Shield, User, Sparkles } from "lucide-react";
import { UserRole } from "@/lib/types";

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("candidate@example.com");
  const [role, setRole] = useState<UserRole>("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isRegister ? "register" : "login",
          name,
          email,
          role
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("love_neet_user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = (demoRole: UserRole) => {
    const demoUser =
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

    localStorage.setItem("love_neet_user", JSON.stringify(demoUser));
    if (demoRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "4rem 0", flex: 1, display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "480px" }}>
          <div className="card" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)" }}>
            {/* Logo and Heading */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  margin: "0 auto 1rem",
                  boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)"
                }}
              >
                <Activity size={26} />
              </div>
              <h1 className="display-sm" style={{ color: "var(--ink)", marginBottom: "0.5rem" }}>
                {isRegister ? "Create NEET Aspirant Account" : "Sign In to Love NEET"}
              </h1>
              <p className="body-sm">
                {isRegister
                  ? "Join the premier test series for medical entrance excellence."
                  : "Access your mock tests, saved progress, and AI analytics."}
              </p>
            </div>

            {/* Quick Demo Access Bar */}
            <div
              style={{
                backgroundColor: "var(--canvas-soft-2)",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.75rem",
                textAlign: "center"
              }}
            >
              <span className="caption-mono" style={{ color: "var(--mute)", display: "block", marginBottom: "0.65rem" }}>
                1-Click Quick Demo Sign In
              </span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => loginAsDemo("candidate")}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, backgroundColor: "#ffffff" }}
                >
                  <User size={14} color="var(--primary)" />
                  <span>Candidate Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo("admin")}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, backgroundColor: "#ffffff" }}
                >
                  <Shield size={14} color="var(--teal)" />
                  <span>Admin Demo</span>
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
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1.25rem"
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="form-control">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rohan Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-text"
                  />
                </div>
              )}

              <div className="form-control">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                />
              </div>

              {isRegister && (
                <div className="form-control">
                  <label className="form-label">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="select-input"
                  >
                    <option value="candidate">Candidate (NEET Student)</option>
                    <option value="admin">Admin / Medical Faculty</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <span>{loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}</span>
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
                    onClick={() => setIsRegister(false)}
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
                    onClick={() => setIsRegister(true)}
                    style={{ border: "none", background: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer" }}
                  >
                    Register Free
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
