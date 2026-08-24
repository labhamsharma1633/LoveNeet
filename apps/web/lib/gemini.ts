import { Question, QuestionDifficulty, NEETSection, NEETSubject } from "./types";

interface GeminiExtractionInput {
  text?: string;
  pdfBase64?: string;
  filename: string;
}

interface RawGeminiMCQ {
  questionNumber: number;
  subject: string;
  section?: string;
  topic?: string;
  text: string;
  options: Array<{
    label: string;
    text: string;
  }>;
  correctOption: string;
  marks?: number;
  negativeMarks?: number;
  difficulty?: string;
  explanation?: string;
}

/**
 * Extracts and structures NEET MCQs using Google Gemini Multi-Modal / Vision API (Free Tier)
 */
export async function extractMCQsWithGemini(
  input: GeminiExtractionInput,
  explicitApiKey?: string
): Promise<Question[] | null> {
  const apiKey =
    explicitApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.AI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === "change-me") {
    return null;
  }

  const systemInstruction = `
You are an expert NEET medical examination data extraction AI.
Your task is to analyze the provided question paper document/text and extract all Multiple Choice Questions (MCQs) into structured JSON.

For every question:
1. "questionNumber": The integer question index (1, 2, 3...).
2. "subject": Classify strictly into one of ["Physics", "Chemistry", "Botany", "Zoology"].
3. "section": For each subject, questions 1-35 are "Section A" and 36-45 are "Section B".
4. "topic": Concise topic name (e.g., "Basic Maths & Calculus", "Some Basic Concepts of Chemistry", "Cell - The Unit of Life", "Epithelial Tissue").
5. "text": Complete, authentic question text including all mathematical expressions, chemical equations, units, or table data. Use clear text and Unicode/LaTeX characters where needed.
6. "options": Array of 4 items with:
   - "label": "A", "B", "C", or "D"
   - "text": The option content string
7. "correctOption": The correct answer label ("A", "B", "C", or "D") from the answer key or derived by expert solution.
8. "difficulty": "easy", "medium", or "hard".
9. "explanation": A thorough, step-by-step NCERT-based medical/physical reasoning or calculation explaining why that answer is correct.

Output strictly valid JSON matching this schema:
{
  "questions": [
    {
      "questionNumber": 1,
      "subject": "Physics",
      "section": "Section A",
      "topic": "Topic name",
      "text": "Question text here",
      "options": [
        { "label": "A", "text": "Option A" },
        { "label": "B", "text": "Option B" },
        { "label": "C", "text": "Option C" },
        { "label": "D", "text": "Option D" }
      ],
      "correctOption": "A",
      "difficulty": "medium",
      "explanation": "Step by step solution..."
    }
  ]
}
`;

  try {
    const parts: any[] = [
      {
        text: `Please parse all questions from this NEET exam booklet: "${input.filename}". Extract every single question accurately with all options, answer key, and solutions.`
      }
    ];

    if (input.pdfBase64) {
      parts.push({
        inline_data: {
          mime_type: "application/pdf",
          data: input.pdfBase64
        }
      });
    }

    if (input.text && input.text.trim().length > 10) {
      parts.push({
        text: `Document Content Streams:\n\n${input.text}`
      });
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts
        }
      ],
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.1,
        maxOutputTokens: 8192
      }
    };

    // Use gemini-1.5-flash or gemini-2.0-flash with fallback
    const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
    let responseData: any = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          responseData = await res.json();
          break;
        } else {
          const errText = await res.text();
          console.warn(`Gemini model ${model} response:`, res.status, errText);
        }
      } catch (e) {
        console.warn(`Failed to connect to ${model}:`, e);
      }
    }

    if (!responseData) return null;

    const candidate = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) return null;

    const parsedJson = JSON.parse(candidate);
    const rawQuestions: RawGeminiMCQ[] = Array.isArray(parsedJson)
      ? parsedJson
      : parsedJson.questions || [];

    if (!rawQuestions || rawQuestions.length === 0) return null;

    const questions: Question[] = rawQuestions.map((q, idx) => {
      const qNum = q.questionNumber || idx + 1;
      let subj: NEETSubject = "Chemistry";
      const s = (q.subject || "").toLowerCase();
      if (s.includes("phys")) subj = "Physics";
      else if (s.includes("chem")) subj = "Chemistry";
      else if (s.includes("bot")) subj = "Botany";
      else if (s.includes("zoo") || s.includes("bio")) subj = "Zoology";

      let sect: NEETSection = "Section A";
      if (q.section && q.section.toLowerCase().includes("b")) {
        sect = "Section B";
      } else {
        sect = qNum % 45 > 35 || qNum % 45 === 0 ? "Section B" : "Section A";
      }

      let diff: QuestionDifficulty = "medium";
      if (q.difficulty === "easy" || q.difficulty === "hard") {
        diff = q.difficulty;
      }

      const formattedOptions = (q.options || []).map((opt, optIdx) => {
        let label = (opt.label || ["A", "B", "C", "D"][optIdx] || "A").toUpperCase();
        if (label === "1") label = "A";
        if (label === "2") label = "B";
        if (label === "3") label = "C";
        if (label === "4") label = "D";
        return {
          id: `opt-${qNum}-${label.toLowerCase()}`,
          label,
          text: opt.text || `Option ${label}`
        };
      });

      let correctLabel = (q.correctOption || "A").toUpperCase();
      if (correctLabel === "1") correctLabel = "A";
      if (correctLabel === "2") correctLabel = "B";
      if (correctLabel === "3") correctLabel = "C";
      if (correctLabel === "4") correctLabel = "D";

      const matchedOpt = formattedOptions.find((o) => o.label === correctLabel);
      const correctOptionId = matchedOpt?.id || formattedOptions[0]?.id || `opt-${qNum}-a`;

      return {
        id: `gemini-q-${Date.now()}-${qNum}`,
        questionNumber: qNum,
        subject: subj,
        section: sect,
        topic: q.topic || `${subj} Foundation`,
        text: q.text,
        options: formattedOptions,
        correctOptionId,
        marks: q.marks || 4,
        negativeMarks: q.negativeMarks || 1,
        difficulty: diff,
        explanation: q.explanation || "Extracted via Gemini Vision AI. Standard NTA NEET marking scheme.",
        sourcePage: Math.ceil(qNum / 10),
        isAiExtracted: true,
        reviewedByAdmin: false
      };
    });

    return questions;
  } catch (err) {
    console.error("Gemini extraction error:", err);
    return null;
  }
}
