"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  AlertCircle,
  Award,
  ChevronRight,
  Clock,
  HelpCircle,
  Layers,
  Send,
  Shield,
  User
} from "lucide-react";
import {
  NEETSection,
  NEETSubject,
  Question,
  QuestionResponse,
  QuestionStatusState,
  TestAttempt,
  TestConfig,
  UserProfile
} from "@/lib/types";
import { SubjectTabs } from "@/components/SubjectTabs";
import { QuestionPalette } from "@/components/QuestionPalette";
import { QuestionCard } from "@/components/QuestionCard";
import { TimerClock } from "@/components/TimerClock";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export default function LiveTestPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: testId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptIdParam = searchParams.get("attemptId");

  const [test, setTest] = useState<TestConfig | null>(null);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [activeSubject, setActiveSubject] = useState<NEETSubject>("Zoology");
  const [activeSection, setActiveSection] = useState<NEETSection>("Section A");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");

  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize test and attempt
  useEffect(() => {
    const savedUser = localStorage.getItem("love_neet_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    // 1. Fetch test details
    fetch(`/api/tests/${testId}`)
      .then((res) => res.json())
      .then(async (testData) => {
        if (!testData.test) throw new Error("Test not found");
        setTest(testData.test);

        const firstQ = testData.test.questions?.[0];
        if (firstQ) {
          setActiveSubject(firstQ.subject);
          setActiveSection(firstQ.section);
          setCurrentQuestionId(firstQ.id);
        }

        // 2. Fetch or create attempt
        let attId = attemptIdParam;
        if (!attId) {
          const createRes = await fetch("/api/attempts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              testId: testData.test.id,
              candidateId: user?.id || "user-cand-01",
              candidateName: user?.name || "Medical Aspirant"
            })
          });
          const createData = await createRes.json();
          attId = createData.attempt.id;
        }

        if (attId) {
          const attRes = await fetch(`/api/attempts/${attId}`);
          const attData = await attRes.json();
          if (attData.attempt) {
            setAttempt(attData.attempt);
            if (attData.attempt.responses) {
              setResponses(attData.attempt.responses);
            }
            if (attData.attempt.currentQuestionId) {
              setCurrentQuestionId(attData.attempt.currentQuestionId);
            }
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [testId, attemptIdParam]);

  // Sync responses to backend periodically / on change
  const syncResponsesToServer = useCallback(
    (updatedResponses: Record<string, QuestionResponse>, qId?: string) => {
      if (!attempt?.id) return;
      fetch(`/api/attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: updatedResponses,
          currentQuestionId: qId || currentQuestionId
        })
      }).catch(console.error);
    },
    [attempt?.id, currentQuestionId]
  );

  // Filter questions by active subject and section
  const currentQuestionsPool = test?.questions || [];
  const subjectFilteredQuestions = currentQuestionsPool.filter(
    (q) => q.subject === activeSubject && q.section === activeSection
  );

  const activeQuestionIndex = currentQuestionsPool.findIndex((q) => q.id === currentQuestionId);
  const currentQuestion = currentQuestionsPool[activeQuestionIndex] || currentQuestionsPool[0];

  // Attempt statistics per subject
  const subjectAttemptCounts: Record<NEETSubject, { attempted: number; total: number }> = {
    Physics: { attempted: 0, total: 0 },
    Chemistry: { attempted: 0, total: 0 },
    Botany: { attempted: 0, total: 0 },
    Zoology: { attempted: 0, total: 0 }
  };

  currentQuestionsPool.forEach((q) => {
    if (subjectAttemptCounts[q.subject]) {
      subjectAttemptCounts[q.subject].total++;
      if (responses[q.id]?.selectedOptionId) {
        subjectAttemptCounts[q.subject].attempted++;
      }
    }
  });

  // Action handlers
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;

    const existing = responses[currentQuestion.id];
    const isMarked = existing?.isMarkedForReview || false;

    const updatedResponse: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      status: isMarked ? "answered_and_marked" : "answered",
      timeSpentSeconds: (existing?.timeSpentSeconds || 0) + 1,
      isMarkedForReview: isMarked,
      answeredAt: new Date().toISOString()
    };

    const updated = { ...responses, [currentQuestion.id]: updatedResponse };
    setResponses(updated);
    syncResponsesToServer(updated, currentQuestion.id);
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;

    const existing = responses[currentQuestion.id];
    const isMarked = existing?.isMarkedForReview || false;

    const updatedResponse: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedOptionId: undefined,
      status: isMarked ? "marked_for_review" : "visited",
      timeSpentSeconds: existing?.timeSpentSeconds || 0,
      isMarkedForReview: isMarked
    };

    const updated = { ...responses, [currentQuestion.id]: updatedResponse };
    setResponses(updated);
    syncResponsesToServer(updated, currentQuestion.id);
  };

  const handleMarkForReview = () => {
    if (!currentQuestion) return;

    const existing = responses[currentQuestion.id];
    const hasAnswer = !!existing?.selectedOptionId;

    const updatedResponse: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedOptionId: existing?.selectedOptionId,
      status: hasAnswer ? "answered_and_marked" : "marked_for_review",
      timeSpentSeconds: existing?.timeSpentSeconds || 0,
      isMarkedForReview: true
    };

    const updated = { ...responses, [currentQuestion.id]: updatedResponse };
    setResponses(updated);

    // Advance to next question
    if (activeQuestionIndex < currentQuestionsPool.length - 1) {
      const nextQ = currentQuestionsPool[activeQuestionIndex + 1];
      setCurrentQuestionId(nextQ.id);
      setActiveSubject(nextQ.subject);
      setActiveSection(nextQ.section);
      syncResponsesToServer(updated, nextQ.id);
    } else {
      syncResponsesToServer(updated, currentQuestion.id);
    }
  };

  const handleSaveAndNext = () => {
    if (!currentQuestion) return;

    const existing = responses[currentQuestion.id];
    if (!existing) {
      // Mark as visited
      const visitedResp: QuestionResponse = {
        questionId: currentQuestion.id,
        status: "visited",
        timeSpentSeconds: 1,
        isMarkedForReview: false
      };
      const updated = { ...responses, [currentQuestion.id]: visitedResp };
      setResponses(updated);
      syncResponsesToServer(updated);
    }

    // Advance
    if (activeQuestionIndex < currentQuestionsPool.length - 1) {
      const nextQ = currentQuestionsPool[activeQuestionIndex + 1];
      setCurrentQuestionId(nextQ.id);
      setActiveSubject(nextQ.subject);
      setActiveSection(nextQ.section);
      syncResponsesToServer(responses, nextQ.id);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      const prevQ = currentQuestionsPool[activeQuestionIndex - 1];
      setCurrentQuestionId(prevQ.id);
      setActiveSubject(prevQ.subject);
      setActiveSection(prevQ.section);
      syncResponsesToServer(responses, prevQ.id);
    }
  };

  const handleSelectQuestionFromPalette = (qId: string) => {
    const targetQ = currentQuestionsPool.find((q) => q.id === qId);
    if (!targetQ) return;

    // If not answered/marked yet, mark as visited
    if (!responses[targetQ.id]) {
      const updated = {
        ...responses,
        [targetQ.id]: {
          questionId: targetQ.id,
          status: "visited" as QuestionStatusState,
          timeSpentSeconds: 1,
          isMarkedForReview: false
        }
      };
      setResponses(updated);
      syncResponsesToServer(updated, targetQ.id);
    }

    setCurrentQuestionId(targetQ.id);
    setActiveSubject(targetQ.subject);
    setActiveSection(targetQ.section);
  };

  const handleFinalSubmit = async () => {
    if (!attempt?.id) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/attempts/${attempt.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses, testId: test?.id || testId })
      });

      const data = await res.json();
      if (data.result) {
        router.push(`/test/${testId}/result?attemptId=${attempt.id}`);
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit test. Please check connection.");
      setIsSubmitting(false);
    }
  };

  if (loading || !test || !currentQuestion) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--canvas-soft)" }}>
        <div style={{ textAlign: "center" }}>
          <Activity size={36} color="var(--primary)" className="animate-pulse-subtle" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.25rem", color: "var(--ink)", fontWeight: "700" }}>
            Initializing NTA NEET Test Environment...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--canvas-soft)", overflow: "hidden" }}>
      {/* ─── LIVE TEST TOP BAR ─── */}
      <header
        style={{
          height: "64px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          boxShadow: "var(--shadow-1)",
          zIndex: 20
        }}
      >
        {/* Brand & Test Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}
          >
            <Activity size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: "800", color: "var(--ink)", lineHeight: "1.2" }}>
              {test.title}
            </h2>
            <span style={{ fontSize: "0.75rem", color: "var(--mute)" }}>
              Pattern: {test.pattern} • Maximum Marks: {test.totalMarks}
            </span>
          </div>
        </div>

        {/* Center: Real-Time Timer */}
        {attempt?.endTimeExpected && (
          <TimerClock
            endTimeExpected={attempt.endTimeExpected}
            onTimeExpired={handleFinalSubmit}
          />
        )}

        {/* Right: Candidate Info & Submit CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <User size={16} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "var(--ink)" }}>
                {user?.name || "Dr. Aakash Sharma"}
              </span>
              <span style={{ fontSize: "0.6875rem", color: "var(--mute)" }}>
                {user?.rollNumber || "NEET2026-984210"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ backgroundColor: "var(--teal)", borderColor: "var(--teal)" }}
          >
            <Send size={14} />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* ─── LIVE TEST MAIN WORKSPACE ─── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px", gap: "1rem", padding: "1rem 1.5rem", overflow: "hidden" }}>
        {/* Left Column: Subject Tabs + Question Card */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          <SubjectTabs
            subjects={test.subjects}
            activeSubject={activeSubject}
            activeSection={activeSection}
            onSelectSubject={(s) => {
              setActiveSubject(s);
              const firstInSub = currentQuestionsPool.find((q) => q.subject === s && q.section === activeSection);
              if (firstInSub) setCurrentQuestionId(firstInSub.id);
            }}
            onSelectSection={(sec) => {
              setActiveSection(sec);
              const firstInSec = currentQuestionsPool.find((q) => q.subject === activeSubject && q.section === sec);
              if (firstInSec) setCurrentQuestionId(firstInSec.id);
            }}
            subjectAttemptCounts={subjectAttemptCounts}
          />

          <div style={{ flex: 1, minHeight: 0 }}>
            <QuestionCard
              question={currentQuestion}
              currentIndex={activeQuestionIndex}
              totalQuestions={currentQuestionsPool.length}
              response={responses[currentQuestion.id]}
              onSelectOption={handleSelectOption}
              onClearResponse={handleClearResponse}
              onMarkForReview={handleMarkForReview}
              onSaveAndNext={handleSaveAndNext}
              onPrevious={handlePrevious}
              hasNext={activeQuestionIndex < currentQuestionsPool.length - 1}
              hasPrevious={activeQuestionIndex > 0}
            />
          </div>
        </div>

        {/* Right Column: Question Palette (5-state NTA Navigator) */}
        <div style={{ height: "100%", overflow: "hidden" }}>
          <QuestionPalette
            questions={currentQuestionsPool}
            responses={responses}
            currentQuestionId={currentQuestionId}
            onSelectQuestion={handleSelectQuestionFromPalette}
          />
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleFinalSubmit}
        testTitle={test.title}
        questions={currentQuestionsPool}
        responses={responses}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
