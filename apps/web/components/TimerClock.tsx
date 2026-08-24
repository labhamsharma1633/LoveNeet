"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface TimerClockProps {
  endTimeExpected: string;
  onTimeExpired: () => void;
}

export function TimerClock({ endTimeExpected, onTimeExpired }: TimerClockProps) {
  const [timeLeftMs, setTimeLeftMs] = useState<number>(0);
  const [isWarning, setIsWarning] = useState<boolean>(false);

  useEffect(() => {
    const targetTime = new Date(endTimeExpected).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeftMs(0);
        onTimeExpired();
      } else {
        setTimeLeftMs(difference);
        // Warning when less than 5 minutes left (300,000 ms)
        setIsWarning(difference < 300000);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTimeExpected, onTimeExpired]);

  const totalSeconds = Math.max(0, Math.floor(timeLeftMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        backgroundColor: isWarning ? "var(--danger-light)" : "var(--canvas)",
        color: isWarning ? "var(--danger)" : "var(--ink)",
        padding: "0.45rem 0.9rem",
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${isWarning ? "var(--danger)" : "var(--hairline-strong)"}`,
        boxShadow: isWarning ? "0 0 12px rgba(239, 68, 68, 0.3)" : "var(--shadow-1)",
        transition: "all 0.3s ease"
      }}
    >
      {isWarning ? (
        <AlertTriangle size={18} className="animate-pulse-subtle" />
      ) : (
        <Clock size={18} color="var(--primary)" />
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: isWarning ? "var(--danger)" : "var(--mute)" }}>
          {isWarning ? "Time Running Out" : "Time Remaining"}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.125rem",
            fontWeight: "700",
            lineHeight: 1.1
          }}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
