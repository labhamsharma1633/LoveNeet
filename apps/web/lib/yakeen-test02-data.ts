import { Question } from "./types";
import { resolveNCERTReference } from "./ncert-mapper";

const RAW_QUESTIONS: Question[] = [
  {
    "id": "yakeen-pt02-q1",
    "questionNumber": 1,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Angle Between Vectors & Dot Product)",
    "text": "The angle between the two vectors A⃗ = 5î + 5ĵ and B⃗ = 5î - 5ĵ will be:",
    "options": [
      {
        "id": "opt-1-a",
        "label": "A",
        "text": "0°"
      },
      {
        "id": "opt-1-b",
        "label": "B",
        "text": "45°"
      },
      {
        "id": "opt-1-c",
        "label": "C",
        "text": "90°"
      },
      {
        "id": "opt-1-d",
        "label": "D",
        "text": "180°"
      }
    ],
    "correctOptionId": "opt-1-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "A⃗ · B⃗ = (5)(5) + (5)(-5) = 25 - 25 = 0. Since the dot product A⃗ · B⃗ = 0, the angle θ between them is 90° (orthogonal vectors).",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q2",
    "questionNumber": 2,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Resultant of Two Vectors)",
    "text": "There are two force vectors, one of 5 N and other of 12 N. At what angle the two vectors be added to get resultant vector of 17 N, 7 N and 13 N respectively:",
    "options": [
      {
        "id": "opt-2-a",
        "label": "A",
        "text": "0°, 180° and 90°"
      },
      {
        "id": "opt-2-b",
        "label": "B",
        "text": "0°, 90° and 180°"
      },
      {
        "id": "opt-2-c",
        "label": "C",
        "text": "0°, 90° and 90°"
      },
      {
        "id": "opt-2-d",
        "label": "D",
        "text": "180°, 0° and 90°"
      }
    ],
    "correctOptionId": "opt-2-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "R = √(A² + B² + 2AB cosθ). When θ = 0°, R = 5 + 12 = 17 N (maximum). When θ = 180°, R = 12 - 5 = 7 N (minimum). When θ = 90°, R = √(5² + 12²) = √169 = 13 N. Hence angles are 0°, 180° and 90°.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q3",
    "questionNumber": 3,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Direction Cosines)",
    "text": "Vector P⃗ makes angles α, β & λ with the X, Y and Z axes respectively, then cos²α + cos²β + cos²λ =",
    "options": [
      {
        "id": "opt-3-a",
        "label": "A",
        "text": "0"
      },
      {
        "id": "opt-3-b",
        "label": "B",
        "text": "1"
      },
      {
        "id": "opt-3-c",
        "label": "C",
        "text": "2"
      },
      {
        "id": "opt-3-d",
        "label": "D",
        "text": "3"
      }
    ],
    "correctOptionId": "opt-3-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Direction cosines l = cosα, m = cosβ, n = cosλ satisfy the fundamental property: l² + m² + n² = cos²α + cos²β + cos²λ = 1.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q4",
    "questionNumber": 4,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Vector Cross Product Identities)",
    "text": "Which of the following vector identities is false?",
    "options": [
      {
        "id": "opt-4-a",
        "label": "A",
        "text": "P⃗ + Q⃗ = Q⃗ + P⃗"
      },
      {
        "id": "opt-4-b",
        "label": "B",
        "text": "P⃗ × Q⃗ = Q⃗ × P⃗"
      },
      {
        "id": "opt-4-c",
        "label": "C",
        "text": "P⃗ · Q⃗ = Q⃗ · P⃗"
      },
      {
        "id": "opt-4-d",
        "label": "D",
        "text": "P⃗ × Q⃗ = -(Q⃗ × P⃗)"
      }
    ],
    "correctOptionId": "opt-4-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Cross product is anti-commutative: P⃗ × Q⃗ = -(Q⃗ × P⃗). Therefore, P⃗ × Q⃗ = Q⃗ × P⃗ is false.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q5",
    "questionNumber": 5,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Null Vector Definition)",
    "text": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R:\nAssertion (A): A physical quantity cannot be called as a vector if its magnitude is zero.\nReason (R): A vector has both magnitude and direction.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-5-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-5-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-5-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-5-d",
        "label": "D",
        "text": "Both A and R are true but R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-5-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Assertion is false: A null vector (zero vector) has zero magnitude and an arbitrary direction, but is still a valid vector. Reason is true: A vector is defined by both magnitude and direction.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q6",
    "questionNumber": 6,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Parallel Vectors Condition)",
    "text": "Given A⃗ = 2î + 3ĵ + k̂ and B⃗ = aî - 6ĵ - 2k̂ are parallel vectors. Then the value of a is:",
    "options": [
      {
        "id": "opt-6-a",
        "label": "A",
        "text": "-4"
      },
      {
        "id": "opt-6-b",
        "label": "B",
        "text": "-1"
      },
      {
        "id": "opt-6-c",
        "label": "C",
        "text": "2"
      },
      {
        "id": "opt-6-d",
        "label": "D",
        "text": "-2"
      }
    ],
    "correctOptionId": "opt-6-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "For parallel vectors, the ratio of corresponding components is equal: 2/a = 3/(-6) = 1/(-2). Thus, 2/a = -1/2 ⇒ a = -4.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q7",
    "questionNumber": 7,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Resultant Forces Ratio)",
    "text": "Two forces whose magnitudes are in the ratio of 3 : 5 give a resultant of 28 N, if the angle of their inclination is 60°. Find magnitude of each force (in newton):",
    "options": [
      {
        "id": "opt-7-a",
        "label": "A",
        "text": "12, 16"
      },
      {
        "id": "opt-7-b",
        "label": "B",
        "text": "4, 20"
      },
      {
        "id": "opt-7-c",
        "label": "C",
        "text": "12, 20"
      },
      {
        "id": "opt-7-d",
        "label": "D",
        "text": "24, 4"
      }
    ],
    "correctOptionId": "opt-7-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Let forces be 3x and 5x. R² = (3x)² + (5x)² + 2(3x)(5x)cos60° = 9x² + 25x² + 30x²(1/2) = 49x². R = 7x = 28 N ⇒ x = 4. Forces are 3(4) = 12 N and 5(4) = 20 N.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q8",
    "questionNumber": 8,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Unit Vector in Direction of Resultant)",
    "text": "A unit vector parallel to the resultant of the vectors A⃗ = 4î + 3ĵ + 6k̂ and B⃗ = -î + 8ĵ - 8k̂ is:",
    "options": [
      {
        "id": "opt-8-a",
        "label": "A",
        "text": "(3î + 11ĵ - 2k̂) / 2"
      },
      {
        "id": "opt-8-b",
        "label": "B",
        "text": "(î + 2ĵ - 3k̂) / √166"
      },
      {
        "id": "opt-8-c",
        "label": "C",
        "text": "(3î + 11ĵ - 2k̂) / √134"
      },
      {
        "id": "opt-8-d",
        "label": "D",
        "text": "(4î + 6ĵ + 8k̂) / √11"
      }
    ],
    "correctOptionId": "opt-8-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Resultant R⃗ = A⃗ + B⃗ = (4-1)î + (3+8)ĵ + (6-8)k̂ = 3î + 11ĵ - 2k̂. Magnitude |R⃗| = √(3² + 11² + (-2)²) = √(9 + 121 + 4) = √134. Unit vector = (3î + 11ĵ - 2k̂) / √134.",
    "sourcePage": 1,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q9",
    "questionNumber": 9,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Geometric Resolution & Vector Diagram)",
    "text": "In the vector diagram with right triangle (hypotenuse B, perpendicular C, base A), what is the angle between A⃗ and B⃗? (Given: C = B/2)",
    "options": [
      {
        "id": "opt-9-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-9-b",
        "label": "B",
        "text": "60°"
      },
      {
        "id": "opt-9-c",
        "label": "C",
        "text": "120°"
      },
      {
        "id": "opt-9-d",
        "label": "D",
        "text": "150°"
      }
    ],
    "correctOptionId": "opt-9-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "sinθ = C/B = (B/2)/B = 1/2 ⇒ θ = 30°. Hence, the angle between A⃗ and B⃗ is 30°.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q10",
    "questionNumber": 10,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Magnitude of 3D Vector)",
    "text": "If A⃗ = 3î + 4ĵ + 2k̂, then find |A⃗|:",
    "options": [
      {
        "id": "opt-10-a",
        "label": "A",
        "text": "√39"
      },
      {
        "id": "opt-10-b",
        "label": "B",
        "text": "√29"
      },
      {
        "id": "opt-10-c",
        "label": "C",
        "text": "28"
      },
      {
        "id": "opt-10-d",
        "label": "D",
        "text": "29"
      }
    ],
    "correctOptionId": "opt-10-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "|A⃗| = √(3² + 4² + 2²) = √(9 + 16 + 4) = √29.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q11",
    "questionNumber": 11,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Angle Dependence of Resultant)",
    "text": "If the angle between two forces increases from 0° to 180°, the magnitude of their resultant:",
    "options": [
      {
        "id": "opt-11-a",
        "label": "A",
        "text": "decreases"
      },
      {
        "id": "opt-11-b",
        "label": "B",
        "text": "increases"
      },
      {
        "id": "opt-11-c",
        "label": "C",
        "text": "remains unchanged"
      },
      {
        "id": "opt-11-d",
        "label": "D",
        "text": "first decreases and then increases"
      }
    ],
    "correctOptionId": "opt-11-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "R = √(A² + B² + 2AB cosθ). As θ increases from 0° to 180°, cosθ decreases monotonically from +1 to -1. Therefore, the resultant force decreases continuously.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q12",
    "questionNumber": 12,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Pythagorean Vector Triplet)",
    "text": "The magnitude of vectors A⃗, B⃗ and C⃗ are 3, 4 and 5 units respectively. If A⃗ + B⃗ = C⃗, the angle between A⃗ and B⃗ is:",
    "options": [
      {
        "id": "opt-12-a",
        "label": "A",
        "text": "π/2"
      },
      {
        "id": "opt-12-b",
        "label": "B",
        "text": "cos⁻¹(0.6)"
      },
      {
        "id": "opt-12-c",
        "label": "C",
        "text": "tan⁻¹(7/5)"
      },
      {
        "id": "opt-12-d",
        "label": "D",
        "text": "π/4"
      }
    ],
    "correctOptionId": "opt-12-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "|A⃗|² + |B⃗|² = 3² + 4² = 25 = 5² = |C⃗|². Since A² + B² = C² and C² = A² + B² + 2AB cosθ, 2AB cosθ = 0 ⇒ cosθ = 0 ⇒ θ = 90° = π/2.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q13",
    "questionNumber": 13,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Maximum Resultant Force)",
    "text": "Two forces of 12 N and 8 N act upon a body. The resultant force on the body has maximum value of:",
    "options": [
      {
        "id": "opt-13-a",
        "label": "A",
        "text": "4 N"
      },
      {
        "id": "opt-13-b",
        "label": "B",
        "text": "0 N"
      },
      {
        "id": "opt-13-c",
        "label": "C",
        "text": "20 N"
      },
      {
        "id": "opt-13-d",
        "label": "D",
        "text": "8 N"
      }
    ],
    "correctOptionId": "opt-13-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "R_max occurs when θ = 0° (parallel forces): R_max = F1 + F2 = 12 N + 8 N = 20 N.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q14",
    "questionNumber": 14,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Parallelogram Law of Vectors)",
    "text": "In a parallelogram ABCD with diagonals AC and BD, which of the following holds true?\n(1) AC⃗ + BD⃗ = 2BC⃗\n(2) AB⃗ + BC⃗ = 2CD⃗\n(3) AC⃗ - AB⃗ = 2BD⃗\n(4) All of these",
    "options": [
      {
        "id": "opt-14-a",
        "label": "A",
        "text": "AC⃗ + BD⃗ = 2BC⃗"
      },
      {
        "id": "opt-14-b",
        "label": "B",
        "text": "AB⃗ + BC⃗ = 2CD⃗"
      },
      {
        "id": "opt-14-c",
        "label": "C",
        "text": "AC⃗ - AB⃗ = 2BD⃗"
      },
      {
        "id": "opt-14-d",
        "label": "D",
        "text": "All of these"
      }
    ],
    "correctOptionId": "opt-14-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "In parallelogram ABCD: AC⃗ = AB⃗ + BC⃗, and BD⃗ = BC⃗ + CD⃗ = BC⃗ - AB⃗. Adding both gives: AC⃗ + BD⃗ = 2BC⃗.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q15",
    "questionNumber": 15,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Equal Magnitudes Condition)",
    "text": "If |A⃗ + B⃗| = |A⃗| = |B⃗|, then the angle between A⃗ and B⃗ will be:",
    "options": [
      {
        "id": "opt-15-a",
        "label": "A",
        "text": "90°"
      },
      {
        "id": "opt-15-b",
        "label": "B",
        "text": "120°"
      },
      {
        "id": "opt-15-c",
        "label": "C",
        "text": "0°"
      },
      {
        "id": "opt-15-d",
        "label": "D",
        "text": "60°"
      }
    ],
    "correctOptionId": "opt-15-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "|A⃗ + B⃗|² = A² + B² + 2AB cosθ. Setting |A⃗ + B⃗| = A = B gives: A² = A² + A² + 2A² cosθ ⇒ -A² = 2A² cosθ ⇒ cosθ = -1/2 ⇒ θ = 120°.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q16",
    "questionNumber": 16,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Resolution of Force Components)",
    "text": "A force of 8 N makes an angle 30° with x-axis. Find the x and y components of the force:",
    "options": [
      {
        "id": "opt-16-a",
        "label": "A",
        "text": "Fx = 4√3 N, Fy = 4 N"
      },
      {
        "id": "opt-16-b",
        "label": "B",
        "text": "Fx = 4 N, Fy = 4√3 N"
      },
      {
        "id": "opt-16-c",
        "label": "C",
        "text": "Fx = 2 N, Fy = 2√3 N"
      },
      {
        "id": "opt-16-d",
        "label": "D",
        "text": "Fx = 2√3 N, Fy = 2 N"
      }
    ],
    "correctOptionId": "opt-16-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fx = F cos30° = 8 × (√3/2) = 4√3 N. Fy = F sin30° = 8 × (1/2) = 4 N.",
    "sourcePage": 2,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q17",
    "questionNumber": 17,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Geometric Angle Between Vectors)",
    "text": "If θ = 30° is the angle between two vectors A⃗ and B⃗, the correct representation of two vectors making an angle of 30° in a plane has tails meeting at 30° (or exterior 150° supplementary):",
    "options": [
      {
        "id": "opt-17-a",
        "label": "A",
        "text": "Tail-to-tail angle of 30°"
      },
      {
        "id": "opt-17-b",
        "label": "B",
        "text": "Head-to-tail angle 150°"
      },
      {
        "id": "opt-17-c",
        "label": "C",
        "text": "Tail-to-tail angle 120°"
      },
      {
        "id": "opt-17-d",
        "label": "D",
        "text": "Both (1) and (2)"
      }
    ],
    "correctOptionId": "opt-17-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "The angle between two vectors is measured between their directions when placed tail-to-tail (30°).",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q18",
    "questionNumber": 18,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Linear Combination of Vectors)",
    "text": "Two vectors are given by a⃗ = -2î + ĵ - 3k̂ and b⃗ = 5î + 3ĵ - 2k̂. Third vector c⃗ is such that 3a⃗ + 2b⃗ - c⃗ = 0⃗. Then c⃗ is:",
    "options": [
      {
        "id": "opt-18-a",
        "label": "A",
        "text": "4î + 9ĵ - 13k̂"
      },
      {
        "id": "opt-18-b",
        "label": "B",
        "text": "-4î - 9ĵ + 13k̂"
      },
      {
        "id": "opt-18-c",
        "label": "C",
        "text": "4î - 9ĵ - 13k̂"
      },
      {
        "id": "opt-18-d",
        "label": "D",
        "text": "4î + 9ĵ + 13k̂"
      }
    ],
    "correctOptionId": "opt-18-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "c⃗ = 3a⃗ + 2b⃗ = 3(-2î + ĵ - 3k̂) + 2(5î + 3ĵ - 2k̂) = (-6î + 3ĵ - 9k̂) + (10î + 6ĵ - 4k̂) = 4î + 9ĵ - 13k̂.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q19",
    "questionNumber": 19,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Triangle Inequality for Resultant)",
    "text": "Which of the following pair of forces will NEVER give a resultant force of 2 N?",
    "options": [
      {
        "id": "opt-19-a",
        "label": "A",
        "text": "2 N and 2 N"
      },
      {
        "id": "opt-19-b",
        "label": "B",
        "text": "1 N and 1 N"
      },
      {
        "id": "opt-19-c",
        "label": "C",
        "text": "1 N and 3 N"
      },
      {
        "id": "opt-19-d",
        "label": "D",
        "text": "1 N and 4 N"
      }
    ],
    "correctOptionId": "opt-19-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "For forces F1 and F2, the resultant R must satisfy |F1 - F2| ≤ R ≤ F1 + F2. For 1 N and 4 N: |4 - 1| = 3 N ≤ R ≤ 5 N. 2 N is outside this range, so it is impossible.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q20",
    "questionNumber": 20,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Magnitude of 3D Vector)",
    "text": "If A⃗ = 6î - 8ĵ + 10k̂, then what will be the magnitude of vector A⃗?",
    "options": [
      {
        "id": "opt-20-a",
        "label": "A",
        "text": "30 unit"
      },
      {
        "id": "opt-20-b",
        "label": "B",
        "text": "20 unit"
      },
      {
        "id": "opt-20-c",
        "label": "C",
        "text": "10 unit"
      },
      {
        "id": "opt-20-d",
        "label": "D",
        "text": "10√2 unit"
      }
    ],
    "correctOptionId": "opt-20-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "|A⃗| = √(6² + (-8)² + 10²) = √(36 + 64 + 100) = √200 = 10√2 unit.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q21",
    "questionNumber": 21,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Trigonometric Ratio in Right Triangle)",
    "text": "In vector diagram where R⃗ is perpendicular to A⃗ with hypotenuse B⃗, if R = B/√2, then value of angle θ is:",
    "options": [
      {
        "id": "opt-21-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-21-b",
        "label": "B",
        "text": "45°"
      },
      {
        "id": "opt-21-c",
        "label": "C",
        "text": "60°"
      },
      {
        "id": "opt-21-d",
        "label": "D",
        "text": "75°"
      }
    ],
    "correctOptionId": "opt-21-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "sinθ = R/B = (B/√2)/B = 1/√2 ⇒ θ = 45°.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q22",
    "questionNumber": 22,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Invariance Under Parallel Translation)",
    "text": "A vector is NOT changed if:",
    "options": [
      {
        "id": "opt-22-a",
        "label": "A",
        "text": "it is rotated through an arbitrary angle."
      },
      {
        "id": "opt-22-b",
        "label": "B",
        "text": "it is multiplied by an arbitrary scalar."
      },
      {
        "id": "opt-22-c",
        "label": "C",
        "text": "it is cross multiplied by a unit vector."
      },
      {
        "id": "opt-22-d",
        "label": "D",
        "text": "it slides parallel to itself."
      }
    ],
    "correctOptionId": "opt-22-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Translating a vector parallel to itself preserves both its magnitude and its direction, leaving the vector unchanged.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q23",
    "questionNumber": 23,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Cross Product of Parallel Vectors)",
    "text": "If a vector A⃗ is parallel to another vector B⃗, then the resultant of the vector cross product A⃗ × B⃗ will be equal to:",
    "options": [
      {
        "id": "opt-23-a",
        "label": "A",
        "text": "A"
      },
      {
        "id": "opt-23-b",
        "label": "B",
        "text": "A⃗"
      },
      {
        "id": "opt-23-c",
        "label": "C",
        "text": "Zero vector"
      },
      {
        "id": "opt-23-d",
        "label": "D",
        "text": "Zero"
      }
    ],
    "correctOptionId": "opt-23-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "A⃗ × B⃗ = |A||B| sin(0°) n̂ = 0⃗ (Zero vector). Since cross product of vectors is a vector, the result is a zero vector.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q24",
    "questionNumber": 24,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Unit Vector of Vector Difference)",
    "text": "Given A⃗ = 3î + ĵ + k̂ and B⃗ = î - 2ĵ + 3k̂. The unit vector parallel to A⃗ - B⃗ is:",
    "options": [
      {
        "id": "opt-24-a",
        "label": "A",
        "text": "(2î + 3ĵ - 2k̂) / 17"
      },
      {
        "id": "opt-24-b",
        "label": "B",
        "text": "(î + 3ĵ - 2k̂)"
      },
      {
        "id": "opt-24-c",
        "label": "C",
        "text": "(2î + 3ĵ - 2k̂) / √17"
      },
      {
        "id": "opt-24-d",
        "label": "D",
        "text": "(2î + 3ĵ - 2k̂) / 289"
      }
    ],
    "correctOptionId": "opt-24-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "A⃗ - B⃗ = (3-1)î + (1 - (-2))ĵ + (1-3)k̂ = 2î + 3ĵ - 2k̂. Magnitude = √(2² + 3² + (-2)²) = √(4 + 9 + 4) = √17. Unit vector = (2î + 3ĵ - 2k̂) / √17.",
    "sourcePage": 3,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q25",
    "questionNumber": 25,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Direction Angle of Resultant)",
    "text": "Two forces of magnitudes F and √3F act at right angles to each other. Their resultant makes an angle β with F. The value of β is:",
    "options": [
      {
        "id": "opt-25-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-25-b",
        "label": "B",
        "text": "45°"
      },
      {
        "id": "opt-25-c",
        "label": "C",
        "text": "60°"
      },
      {
        "id": "opt-25-d",
        "label": "D",
        "text": "135°"
      }
    ],
    "correctOptionId": "opt-25-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "tanβ = (Perpendicular force) / (Base force) = (√3F) / F = √3 ⇒ β = 60°.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q26",
    "questionNumber": 26,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Displacement Vector Between Coordinates)",
    "text": "If a particle moves from point P(2, 3, 5) to point Q(3, 4, 5), its displacement vector is:",
    "options": [
      {
        "id": "opt-26-a",
        "label": "A",
        "text": "î + ĵ + 10k̂"
      },
      {
        "id": "opt-26-b",
        "label": "B",
        "text": "î + ĵ + 5k̂"
      },
      {
        "id": "opt-26-c",
        "label": "C",
        "text": "î + ĵ"
      },
      {
        "id": "opt-26-d",
        "label": "D",
        "text": "2î + 4ĵ + 6k̂"
      }
    ],
    "correctOptionId": "opt-26-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Displacement Δr⃗ = (x2 - x1)î + (y2 - y1)ĵ + (z2 - z1)k̂ = (3-2)î + (4-3)ĵ + (5-5)k̂ = î + ĵ.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q27",
    "questionNumber": 27,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Direction Angles with Coordinate Axes)",
    "text": "The angles which a vector î + ĵ + √2k̂ makes with X, Y and Z axes respectively are:",
    "options": [
      {
        "id": "opt-27-a",
        "label": "A",
        "text": "60°, 60°, 60°"
      },
      {
        "id": "opt-27-b",
        "label": "B",
        "text": "45°, 45°, 45°"
      },
      {
        "id": "opt-27-c",
        "label": "C",
        "text": "60°, 60°, 45°"
      },
      {
        "id": "opt-27-d",
        "label": "D",
        "text": "45°, 45°, 60°"
      }
    ],
    "correctOptionId": "opt-27-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Magnitude = √(1² + 1² + (√2)²) = √(1 + 1 + 2) = 2. cosα = 1/2 ⇒ α = 60°. cosβ = 1/2 ⇒ β = 60°. cosλ = √2/2 = 1/√2 ⇒ λ = 45°.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q28",
    "questionNumber": 28,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Scalar vs Vector Nature)",
    "text": "A physical quantity which has a direction:",
    "options": [
      {
        "id": "opt-28-a",
        "label": "A",
        "text": "Must be a vector"
      },
      {
        "id": "opt-28-b",
        "label": "B",
        "text": "May be a vector"
      },
      {
        "id": "opt-28-c",
        "label": "C",
        "text": "Must be a scalar"
      },
      {
        "id": "opt-28-d",
        "label": "D",
        "text": "None of the above"
      }
    ],
    "correctOptionId": "opt-28-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Electric current and pressure have direction but do not follow the vector law of addition, so they are scalars. Thus, a quantity with direction may be a vector.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q29",
    "questionNumber": 29,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Unit Vectors Triangle Condition)",
    "text": "If a⃗, b⃗ and c⃗ are unit vectors such that a⃗ + b⃗ - c⃗ = 0⃗, then the angle between a⃗ and b⃗ is:",
    "options": [
      {
        "id": "opt-29-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-29-b",
        "label": "B",
        "text": "60°"
      },
      {
        "id": "opt-29-c",
        "label": "C",
        "text": "90°"
      },
      {
        "id": "opt-29-d",
        "label": "D",
        "text": "120°"
      }
    ],
    "correctOptionId": "opt-29-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "a⃗ + b⃗ = c⃗ ⇒ |a⃗ + b⃗|² = |c⃗|² ⇒ a² + b² + 2ab cosθ = c² ⇒ 1 + 1 + 2(1)(1)cosθ = 1 ⇒ 2 cosθ = -1 ⇒ cosθ = -1/2 ⇒ θ = 120°.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q30",
    "questionNumber": 30,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Parallel vs Anti-Parallel Vectors)",
    "text": "If vector A⃗ points to the right and vector B⃗ points in the exact opposite direction (to the left), the two vectors are called:",
    "options": [
      {
        "id": "opt-30-a",
        "label": "A",
        "text": "Null vectors"
      },
      {
        "id": "opt-30-b",
        "label": "B",
        "text": "Equal vectors"
      },
      {
        "id": "opt-30-c",
        "label": "C",
        "text": "Anti-parallel vectors"
      },
      {
        "id": "opt-30-d",
        "label": "D",
        "text": "Parallel vectors"
      }
    ],
    "correctOptionId": "opt-30-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Vectors having opposite directions (angle 180° between them) are termed anti-parallel vectors.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q31",
    "questionNumber": 31,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Determinant Cross Product)",
    "text": "The vectors A⃗ = 3î - 2ĵ + k̂ and B⃗ = î + 4ĵ - 2k̂ are given. What is the cross product A⃗ × B⃗?",
    "options": [
      {
        "id": "opt-31-a",
        "label": "A",
        "text": "10î - 14ĵ - 14k̂"
      },
      {
        "id": "opt-31-b",
        "label": "B",
        "text": "-10î + 14ĵ + 14k̂"
      },
      {
        "id": "opt-31-c",
        "label": "C",
        "text": "0î + 7ĵ + 14k̂"
      },
      {
        "id": "opt-31-d",
        "label": "D",
        "text": "7î + 14ĵ - 14k̂"
      }
    ],
    "correctOptionId": "opt-31-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "A⃗ × B⃗ = |î ĵ k̂; 3 -2 1; 1 4 -2| = î((-2)(-2) - (1)(4)) - ĵ((3)(-2) - (1)(1)) + k̂((3)(4) - (-2)(1)) = î(4-4) - ĵ(-6-1) + k̂(12+2) = 0î + 7ĵ + 14k̂.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q32",
    "questionNumber": 32,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Vertical Component of Force)",
    "text": "A force of 5 N acts on a particle along a direction making an angle of 60° with the vertical. Its vertical component will be:",
    "options": [
      {
        "id": "opt-32-a",
        "label": "A",
        "text": "10 N"
      },
      {
        "id": "opt-32-b",
        "label": "B",
        "text": "3 N"
      },
      {
        "id": "opt-32-c",
        "label": "C",
        "text": "4 N"
      },
      {
        "id": "opt-32-d",
        "label": "D",
        "text": "2.5 N"
      }
    ],
    "correctOptionId": "opt-32-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Vertical component F_v = F cos(60°) = 5 × 0.5 = 2.5 N.",
    "sourcePage": 4,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q33",
    "questionNumber": 33,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Dot Product Anti-Parallel Condition)",
    "text": "If P⃗ · Q⃗ = -PQ, then the angle between P⃗ and Q⃗ is:",
    "options": [
      {
        "id": "opt-33-a",
        "label": "A",
        "text": "0°"
      },
      {
        "id": "opt-33-b",
        "label": "B",
        "text": "180°"
      },
      {
        "id": "opt-33-c",
        "label": "C",
        "text": "45°"
      },
      {
        "id": "opt-33-d",
        "label": "D",
        "text": "60°"
      }
    ],
    "correctOptionId": "opt-33-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "P⃗ · Q⃗ = PQ cosθ = -PQ ⇒ cosθ = -1 ⇒ θ = 180°.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q34",
    "questionNumber": 34,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Equality of Dot and Cross Product)",
    "text": "If |A⃗ · B⃗| = |A⃗ × B⃗|, then the angle between A⃗ and B⃗ is:",
    "options": [
      {
        "id": "opt-34-a",
        "label": "A",
        "text": "45°"
      },
      {
        "id": "opt-34-b",
        "label": "B",
        "text": "30°"
      },
      {
        "id": "opt-34-c",
        "label": "C",
        "text": "60°"
      },
      {
        "id": "opt-34-d",
        "label": "D",
        "text": "90°"
      }
    ],
    "correctOptionId": "opt-34-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "AB cosθ = AB sinθ ⇒ tanθ = 1 ⇒ θ = 45°.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q35",
    "questionNumber": 35,
    "subject": "Physics",
    "section": "Section A",
    "topic": "Vectors (Angle Between A×B and B×A)",
    "text": "The angle between vectors (A⃗ × B⃗) and (B⃗ × A⃗) is:",
    "options": [
      {
        "id": "opt-35-a",
        "label": "A",
        "text": "Zero"
      },
      {
        "id": "opt-35-b",
        "label": "B",
        "text": "π"
      },
      {
        "id": "opt-35-c",
        "label": "C",
        "text": "π/4"
      },
      {
        "id": "opt-35-d",
        "label": "D",
        "text": "π/2"
      }
    ],
    "correctOptionId": "opt-35-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Since B⃗ × A⃗ = -(A⃗ × B⃗), the two vectors point in exactly opposite directions. The angle between them is 180° (π radians).",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q36",
    "questionNumber": 36,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Resultant of Two Vectors)",
    "text": "The resultant of two forces 2P and √2P is √10 P. The angle between the forces is:",
    "options": [
      {
        "id": "opt-36-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-36-b",
        "label": "B",
        "text": "60°"
      },
      {
        "id": "opt-36-c",
        "label": "C",
        "text": "45°"
      },
      {
        "id": "opt-36-d",
        "label": "D",
        "text": "90°"
      }
    ],
    "correctOptionId": "opt-36-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "R² = (2P)² + (√2P)² + 2(2P)(√2P)cosθ ⇒ 10P² = 4P² + 2P² + 4√2 P² cosθ ⇒ 4P² = 4√2 P² cosθ ⇒ cosθ = 1/√2 ⇒ θ = 45°.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q37",
    "questionNumber": 37,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Orthogonality of Sum and Difference)",
    "text": "Given that magnitudes of A⃗ and B⃗ are equal (|A⃗| = |B⃗|). What is the angle between (A⃗ + B⃗) and (A⃗ - B⃗)?",
    "options": [
      {
        "id": "opt-37-a",
        "label": "A",
        "text": "30°"
      },
      {
        "id": "opt-37-b",
        "label": "B",
        "text": "60°"
      },
      {
        "id": "opt-37-c",
        "label": "C",
        "text": "90°"
      },
      {
        "id": "opt-37-d",
        "label": "D",
        "text": "180°"
      }
    ],
    "correctOptionId": "opt-37-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "(A⃗ + B⃗) · (A⃗ - B⃗) = |A⃗|² - |B⃗|² = A² - A² = 0. Since the dot product is 0, the angle between them is 90°.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q38",
    "questionNumber": 38,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Scalar Product and Angle Calculation)",
    "text": "The magnitudes of two vectors are 3 and 4 units and their scalar product is 6 units. The angle between the vectors is:",
    "options": [
      {
        "id": "opt-38-a",
        "label": "A",
        "text": "π/3 rad"
      },
      {
        "id": "opt-38-b",
        "label": "B",
        "text": "π/6 rad"
      },
      {
        "id": "opt-38-c",
        "label": "C",
        "text": "π/2 rad"
      },
      {
        "id": "opt-38-d",
        "label": "D",
        "text": "π/5 rad"
      }
    ],
    "correctOptionId": "opt-38-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "A · B = |A||B| cosθ ⇒ 6 = 3 × 4 × cosθ = 12 cosθ ⇒ cosθ = 1/2 ⇒ θ = 60° = π/3 rad.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q39",
    "questionNumber": 39,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Unit Vector Perpendicular to Two Vectors)",
    "text": "What is the unit vector perpendicular to the following vectors 2î + 2ĵ - k̂ and 6î - 3ĵ + 2k̂?",
    "options": [
      {
        "id": "opt-39-a",
        "label": "A",
        "text": "(î + 10ĵ - 18k̂) / 5√17"
      },
      {
        "id": "opt-39-b",
        "label": "B",
        "text": "(î - 10ĵ + 18k̂) / 5√17"
      },
      {
        "id": "opt-39-c",
        "label": "C",
        "text": "(î - 10ĵ - 18k̂) / 5√17"
      },
      {
        "id": "opt-39-d",
        "label": "D",
        "text": "(î + 10ĵ + 18k̂) / 5√17"
      }
    ],
    "correctOptionId": "opt-39-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "A⃗ × B⃗ = |î ĵ k̂; 2 2 -1; 6 -3 2| = î(4-3) - ĵ(4 - (-6)) + k̂(-6-12) = î - 10ĵ - 18k̂. Magnitude = √(1 + 100 + 324) = √425 = 5√17. Unit vector = (î - 10ĵ - 18k̂) / 5√17.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q40",
    "questionNumber": 40,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Angle with Negative Vector)",
    "text": "If angle between A⃗ and B⃗ is 30°, then the angle between A⃗ and -B⃗ will be:",
    "options": [
      {
        "id": "opt-40-a",
        "label": "A",
        "text": "60°"
      },
      {
        "id": "opt-40-b",
        "label": "B",
        "text": "150°"
      },
      {
        "id": "opt-40-c",
        "label": "C",
        "text": "45°"
      },
      {
        "id": "opt-40-d",
        "label": "D",
        "text": "90°"
      }
    ],
    "correctOptionId": "opt-40-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "The angle with the negative vector is the supplementary angle: 180° - 30° = 150°.",
    "sourcePage": 5,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q41",
    "questionNumber": 41,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Perpendicular Vectors Dot Product)",
    "text": "If A⃗ = 7î + 2ĵ - 3k̂ and B⃗ = î + ĵ + 2ck̂ are perpendicular vectors, the value of c is:",
    "options": [
      {
        "id": "opt-41-a",
        "label": "A",
        "text": "-1.5"
      },
      {
        "id": "opt-41-b",
        "label": "B",
        "text": "1.5"
      },
      {
        "id": "opt-41-c",
        "label": "C",
        "text": "3"
      },
      {
        "id": "opt-41-d",
        "label": "D",
        "text": "Zero"
      }
    ],
    "correctOptionId": "opt-41-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "A⃗ · B⃗ = 7(1) + 2(1) - 3(2c) = 7 + 2 - 6c = 9 - 6c = 0 ⇒ 6c = 9 ⇒ c = 1.5.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q42",
    "questionNumber": 42,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Orthogonal Sum and Difference)",
    "text": "If A⃗ + B⃗ = R⃗ and A⃗ - B⃗ = D⃗, then find angle between A⃗ and B⃗ if |R⃗| = |D⃗|:",
    "options": [
      {
        "id": "opt-42-a",
        "label": "A",
        "text": "π/2"
      },
      {
        "id": "opt-42-b",
        "label": "B",
        "text": "π/3"
      },
      {
        "id": "opt-42-c",
        "label": "C",
        "text": "π/4"
      },
      {
        "id": "opt-42-d",
        "label": "D",
        "text": "π"
      }
    ],
    "correctOptionId": "opt-42-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "|A⃗ + B⃗|² = |A⃗ - B⃗|² ⇒ A² + B² + 2AB cosθ = A² + B² - 2AB cosθ ⇒ 4AB cosθ = 0 ⇒ cosθ = 0 ⇒ θ = π/2.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q43",
    "questionNumber": 43,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Triangle Law Representation)",
    "text": "Vectors A⃗ (horizontal right) and B⃗ (inclined up-right) are shown. The diagram representing A⃗ + B⃗ places the tail of B⃗ at the head of A⃗ with resultant from tail of A⃗ to head of B⃗:",
    "options": [
      {
        "id": "opt-43-a",
        "label": "A",
        "text": "Option 1 (Head-to-tail triangle)"
      },
      {
        "id": "opt-43-b",
        "label": "B",
        "text": "Option 2"
      },
      {
        "id": "opt-43-c",
        "label": "C",
        "text": "Option 3"
      },
      {
        "id": "opt-43-d",
        "label": "D",
        "text": "Option 4"
      }
    ],
    "correctOptionId": "opt-43-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "By the Triangle Law of Vector Addition, vector addition connects the tail of the second vector to the head of the first, with the resultant closing the triangle.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q44",
    "questionNumber": 44,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Resultant Perpendicular to Smaller Force)",
    "text": "The sum of the magnitudes of two forces acting at a point is 18 N and the magnitude of their resultant is 12 N. If the resultant is at 90° with the force of smaller magnitude, what are the magnitudes of forces (in N)?",
    "options": [
      {
        "id": "opt-44-a",
        "label": "A",
        "text": "12, 5"
      },
      {
        "id": "opt-44-b",
        "label": "B",
        "text": "14, 4"
      },
      {
        "id": "opt-44-c",
        "label": "C",
        "text": "5, 13"
      },
      {
        "id": "opt-44-d",
        "label": "D",
        "text": "10, 8"
      }
    ],
    "correctOptionId": "opt-44-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Let smaller force be F1 and larger force be F2. F1 + F2 = 18. Since resultant R is perpendicular to F1, F2² = F1² + R² ⇒ F2² - F1² = 12² = 144 ⇒ (F2 - F1)(F2 + F1) = 144 ⇒ (F2 - F1)(18) = 144 ⇒ F2 - F1 = 8. Adding both: 2F2 = 26 ⇒ F2 = 13 N, F1 = 5 N.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q45",
    "questionNumber": 45,
    "subject": "Physics",
    "section": "Section B",
    "topic": "Vectors (Cross Product Perpendicularity Properties)",
    "text": "If A⃗ × B⃗ = C⃗, then which of the following statements is WRONG?",
    "options": [
      {
        "id": "opt-45-a",
        "label": "A",
        "text": "C⃗ ⊥ A⃗"
      },
      {
        "id": "opt-45-b",
        "label": "B",
        "text": "C⃗ ⊥ B⃗"
      },
      {
        "id": "opt-45-c",
        "label": "C",
        "text": "C⃗ ⊥ (A⃗ + B⃗)"
      },
      {
        "id": "opt-45-d",
        "label": "D",
        "text": "C⃗ ⊥ (A⃗ × B⃗)"
      }
    ],
    "correctOptionId": "opt-45-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "C⃗ = A⃗ × B⃗ is perpendicular to the plane containing A⃗ and B⃗, hence perpendicular to A⃗, B⃗, and (A⃗ + B⃗). But C⃗ is parallel (not perpendicular) to A⃗ × B⃗ because C⃗ is A⃗ × B⃗.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q46",
    "questionNumber": 46,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Limiting Reagent)",
    "text": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R:\nAssertion (A): When 4 moles of H₂ reacts with 4 mole of O₂, 4 moles of water are formed.\nReason (R): O₂ will act as limiting reagent.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-46-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-46-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-46-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-46-d",
        "label": "D",
        "text": "Both A and R are true and R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-46-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "2H₂ + O₂ → 2H₂O. 4 moles of H₂ require 2 moles of O₂ to form 4 moles of H₂O. H₂ is completely consumed (limiting reagent), while O₂ is in excess (2 moles remaining). Thus Assertion is true, but Reason is false.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q47",
    "questionNumber": 47,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mass by Volume Percentage)",
    "text": "When 20 g of sugar is dissolved in 200 mL of H₂O, the mass by volume percentage of sugar in the solution is:",
    "options": [
      {
        "id": "opt-47-a",
        "label": "A",
        "text": "10%"
      },
      {
        "id": "opt-47-b",
        "label": "B",
        "text": "15%"
      },
      {
        "id": "opt-47-c",
        "label": "C",
        "text": "20%"
      },
      {
        "id": "opt-47-d",
        "label": "D",
        "text": "25%"
      }
    ],
    "correctOptionId": "opt-47-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Mass by volume % = (Mass of solute / Volume of solution in mL) × 100 = (20 g / 200 mL) × 100 = 10%.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q48",
    "questionNumber": 48,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Law of Multiple Proportions)",
    "text": "1.0 g of an oxide of A contained 0.5 g of A. 4.0 g of another oxide of A contained 1.6 g of A. The data indicate the law of:",
    "options": [
      {
        "id": "opt-48-a",
        "label": "A",
        "text": "Conservation of mass"
      },
      {
        "id": "opt-48-b",
        "label": "B",
        "text": "Constant proportions"
      },
      {
        "id": "opt-48-c",
        "label": "C",
        "text": "Conservation of energy"
      },
      {
        "id": "opt-48-d",
        "label": "D",
        "text": "Multiple proportions"
      }
    ],
    "correctOptionId": "opt-48-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "In oxide 1: 0.5 g A combines with 0.5 g O (1:1 ratio). In oxide 2: 1.6 g A combines with 2.4 g O (1:1.5 ratio). The masses of oxygen combining with a fixed mass of A bear a simple ratio (1 : 1.5 = 2 : 3), demonstrating the Law of Multiple Proportions.",
    "sourcePage": 6,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q49",
    "questionNumber": 49,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Stoichiometry & Gas Volume)",
    "text": "H₂ evolved at STP on complete reaction of 27 g of aluminium with excess of aqueous NaOH (Al + H₂O + NaOH → NaAlO₂ + 3/2 H₂) would be:",
    "options": [
      {
        "id": "opt-49-a",
        "label": "A",
        "text": "22.4 litres"
      },
      {
        "id": "opt-49-b",
        "label": "B",
        "text": "44.8 litres"
      },
      {
        "id": "opt-49-c",
        "label": "C",
        "text": "67.2 litres"
      },
      {
        "id": "opt-49-d",
        "label": "D",
        "text": "33.6 litres"
      }
    ],
    "correctOptionId": "opt-49-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Atomic mass of Al = 27 g/mol (1 mole). 1 mole of Al produces 1.5 moles of H₂ gas. Volume of H₂ at STP = 1.5 × 22.4 L = 33.6 litres.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q50",
    "questionNumber": 50,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Molarity Calculation)",
    "text": "500 mL of a glucose solution contains 90 g of glucose. The concentration of the solution is (Molar mass of glucose = 180 g mol⁻¹):",
    "options": [
      {
        "id": "opt-50-a",
        "label": "A",
        "text": "0.1 M"
      },
      {
        "id": "opt-50-b",
        "label": "B",
        "text": "1.0 M"
      },
      {
        "id": "opt-50-c",
        "label": "C",
        "text": "0.2 M"
      },
      {
        "id": "opt-50-d",
        "label": "D",
        "text": "2.0 M"
      }
    ],
    "correctOptionId": "opt-50-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Moles of glucose = 90 / 180 = 0.5 mol. Volume = 500 mL = 0.5 L. Molarity = 0.5 mol / 0.5 L = 1.0 M.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q51",
    "questionNumber": 51,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Photosynthesis Stoichiometry)",
    "text": "How many molecules of CO₂ will be needed to obtain 1.8 g of glucose according to: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (Molar mass of glucose = 180 g mol⁻¹)?",
    "options": [
      {
        "id": "opt-51-a",
        "label": "A",
        "text": "0.6 × 6.022 × 10²³"
      },
      {
        "id": "opt-51-b",
        "label": "B",
        "text": "6 × 6.022 × 10²³"
      },
      {
        "id": "opt-51-c",
        "label": "C",
        "text": "0.06 × 6.022 × 10²³"
      },
      {
        "id": "opt-51-d",
        "label": "D",
        "text": "60 × 6.022 × 10²³"
      }
    ],
    "correctOptionId": "opt-51-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Moles of glucose = 1.8 / 180 = 0.01 mol. Moles of CO₂ needed = 6 × 0.01 = 0.06 mol. Number of molecules = 0.06 × 6.022 × 10²³.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q52",
    "questionNumber": 52,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Empirical Formula)",
    "text": "In a hydrocarbon, mass ratio of hydrogen and carbon is 1 : 3, the empirical formula of hydrocarbon is:",
    "options": [
      {
        "id": "opt-52-a",
        "label": "A",
        "text": "CH₄"
      },
      {
        "id": "opt-52-b",
        "label": "B",
        "text": "CH₂"
      },
      {
        "id": "opt-52-c",
        "label": "C",
        "text": "C₂H"
      },
      {
        "id": "opt-52-d",
        "label": "D",
        "text": "CH₃"
      }
    ],
    "correctOptionId": "opt-52-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Relative moles: C = 3 / 12 = 0.25; H = 1 / 1 = 1.0. Simplest ratio: C = 0.25/0.25 = 1, H = 1.0/0.25 = 4. Empirical formula is CH₄.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q53",
    "questionNumber": 53,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Number of Atoms in Molecule)",
    "text": "The number of oxygen atoms in 4.4 g of CO₂ is:",
    "options": [
      {
        "id": "opt-53-a",
        "label": "A",
        "text": "1.2 × 10²³"
      },
      {
        "id": "opt-53-b",
        "label": "B",
        "text": "6 × 10²²"
      },
      {
        "id": "opt-53-c",
        "label": "C",
        "text": "6 × 10²³"
      },
      {
        "id": "opt-53-d",
        "label": "D",
        "text": "12 × 10²³"
      }
    ],
    "correctOptionId": "opt-53-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Moles of CO₂ = 4.4 / 44 = 0.1 mol. Each molecule of CO₂ contains 2 oxygen atoms. Total oxygen atoms = 0.1 × 2 × 6.022 × 10²³ = 1.204 × 10²³.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q54",
    "questionNumber": 54,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Avogadro Number Standard)",
    "text": "The number of atoms in 12 g of C-12 atom is:",
    "options": [
      {
        "id": "opt-54-a",
        "label": "A",
        "text": "6"
      },
      {
        "id": "opt-54-b",
        "label": "B",
        "text": "12"
      },
      {
        "id": "opt-54-c",
        "label": "C",
        "text": "N_A"
      },
      {
        "id": "opt-54-d",
        "label": "D",
        "text": "6 × N_A"
      }
    ],
    "correctOptionId": "opt-54-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "12 g of Carbon-12 equals exactly 1 mole of carbon atoms, which contains Avogadro's number of atoms (N_A = 6.022 × 10²³).",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q55",
    "questionNumber": 55,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Equal Molecules Law)",
    "text": "What is the mass of carbon dioxide which contains the same number of molecules as are contained in 40 g of oxygen (O₂)?",
    "options": [
      {
        "id": "opt-55-a",
        "label": "A",
        "text": "40 g"
      },
      {
        "id": "opt-55-b",
        "label": "B",
        "text": "55 g"
      },
      {
        "id": "opt-55-c",
        "label": "C",
        "text": "32 g"
      },
      {
        "id": "opt-55-d",
        "label": "D",
        "text": "44 g"
      }
    ],
    "correctOptionId": "opt-55-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Moles of O₂ = 40 / 32 = 1.25 mol. Equal molecules require equal moles (1.25 mol). Mass of CO₂ = 1.25 × 44 = 55 g.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q56",
    "questionNumber": 56,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Law of Multiple Proportions)",
    "text": "The statement, 'If two elements can combine to form more than one compound, the masses of one element that combine with a fixed mass of the other element, are in the ratio of small whole numbers' is in accordance with:",
    "options": [
      {
        "id": "opt-56-a",
        "label": "A",
        "text": "Avogadro's law"
      },
      {
        "id": "opt-56-b",
        "label": "B",
        "text": "Law of constant proportions"
      },
      {
        "id": "opt-56-c",
        "label": "C",
        "text": "Law of multiple proportions"
      },
      {
        "id": "opt-56-d",
        "label": "D",
        "text": "Law of conservation of mass"
      }
    ],
    "correctOptionId": "opt-56-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "This is the precise formal definition of Dalton's Law of Multiple Proportions.",
    "sourcePage": 7,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q57",
    "questionNumber": 57,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Allotropes Atomic Count)",
    "text": "Given below are two statements:\nAssertion (A): The number of oxygen atoms in 1 g of O₂, 1 g of O₃ and 1 g of atomic oxygen is same.\nReason (R): O₂ and O₃ have different molar masses.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-57-a",
        "label": "A",
        "text": "Both A and R are true and R is NOT the correct explanation of A."
      },
      {
        "id": "opt-57-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-57-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-57-d",
        "label": "D",
        "text": "A is true but R is false."
      }
    ],
    "correctOptionId": "opt-57-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Assertion is true because total moles of oxygen atoms = (1 g / 16 g mol⁻¹) = 1/16 mol, which is identical for O, O₂, and O₃. Reason is true (O₂ = 32, O₃ = 48), but does not explain why the number of atoms is identical.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q58",
    "questionNumber": 58,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Molality from Molarity)",
    "text": "Molarity of H₂SO₄ is 18 M. Its density is 1.8 g/cm³, hence its molality is (Molar Mass of H₂SO₄ = 98 g mol⁻¹):",
    "options": [
      {
        "id": "opt-58-a",
        "label": "A",
        "text": "18 m"
      },
      {
        "id": "opt-58-b",
        "label": "B",
        "text": "100 m"
      },
      {
        "id": "opt-58-c",
        "label": "C",
        "text": "36 m"
      },
      {
        "id": "opt-58-d",
        "label": "D",
        "text": "500 m"
      }
    ],
    "correctOptionId": "opt-58-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Mass of 1 L solution = 1000 × 1.8 = 1800 g. Mass of solute = 18 × 98 = 1764 g. Mass of solvent = 1800 - 1764 = 36 g = 0.036 kg. Molality m = 18 / 0.036 = 500 m.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q59",
    "questionNumber": 59,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Volume of Single Molecule)",
    "text": "Volume occupied by one molecule of water (density = 1 g cm⁻³) is:",
    "options": [
      {
        "id": "opt-59-a",
        "label": "A",
        "text": "18 N_A cm³"
      },
      {
        "id": "opt-59-b",
        "label": "B",
        "text": "18 / N_A cm³"
      },
      {
        "id": "opt-59-c",
        "label": "C",
        "text": "N_A / 16 cm³"
      },
      {
        "id": "opt-59-d",
        "label": "D",
        "text": "16 N_A cm³"
      }
    ],
    "correctOptionId": "opt-59-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Mass of 1 mole (N_A molecules) = 18 g. Volume of 1 mole = Mass / Density = 18 / 1 = 18 cm³. Volume of 1 molecule = 18 / N_A cm³.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q60",
    "questionNumber": 60,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Vapour Density to Volume)",
    "text": "The volume occupied by 10 g of unknown gas having vapour density 2.24 at STP is:",
    "options": [
      {
        "id": "opt-60-a",
        "label": "A",
        "text": "2.5 L"
      },
      {
        "id": "opt-60-b",
        "label": "B",
        "text": "25 L"
      },
      {
        "id": "opt-60-c",
        "label": "C",
        "text": "50 L"
      },
      {
        "id": "opt-60-d",
        "label": "D",
        "text": "5 L"
      }
    ],
    "correctOptionId": "opt-60-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Molar mass = 2 × Vapour Density = 2 × 2.24 = 4.48 g/mol. Moles = 10 / 4.48 = 2.232 mol. Volume at STP = 2.232 × 22.4 = 50 L.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q61",
    "questionNumber": 61,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Gas Molar Mass Identification)",
    "text": "11.2 L of a gas at STP weighs 14 g. The gas could be:",
    "options": [
      {
        "id": "opt-61-a",
        "label": "A",
        "text": "CO₂"
      },
      {
        "id": "opt-61-b",
        "label": "B",
        "text": "NO₂"
      },
      {
        "id": "opt-61-c",
        "label": "C",
        "text": "CO"
      },
      {
        "id": "opt-61-d",
        "label": "D",
        "text": "NO"
      }
    ],
    "correctOptionId": "opt-61-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "11.2 L at STP is 0.5 mole. Molar mass = 14 g / 0.5 mol = 28 g/mol. Carbon monoxide (CO) has molar mass = 12 + 16 = 28 g/mol.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q62",
    "questionNumber": 62,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Molar Volume at STP)",
    "text": "Given below are two statements:\nAssertion (A): 8 g of CH₄ gas at S.T.P occupy 11.2 L volume.\nReason (R): One mole of any gaseous substance at STP occupy 22.4 mL of volume.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-62-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-62-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-62-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-62-d",
        "label": "D",
        "text": "Both A and R are true and R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-62-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Assertion is true: Moles of CH₄ = 8/16 = 0.5 mol. Volume = 0.5 × 22.4 L = 11.2 L. Reason is false: One mole occupies 22.4 litres, NOT 22.4 mL.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q63",
    "questionNumber": 63,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mole Removal Calculation)",
    "text": "A container has 88 g of CO₂, out of which 6.022 × 10²² molecules are removed. How many moles of CO₂ are left in the container?",
    "options": [
      {
        "id": "opt-63-a",
        "label": "A",
        "text": "1.0"
      },
      {
        "id": "opt-63-b",
        "label": "B",
        "text": "1.9"
      },
      {
        "id": "opt-63-c",
        "label": "C",
        "text": "1.2"
      },
      {
        "id": "opt-63-d",
        "label": "D",
        "text": "1.5"
      }
    ],
    "correctOptionId": "opt-63-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Initial moles = 88 / 44 = 2.0 mol. Removed moles = (6.022 × 10²²) / (6.022 × 10²³) = 0.1 mol. Remaining moles = 2.0 - 0.1 = 1.9 mol.",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q64",
    "questionNumber": 64,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Maximum Number of Atoms)",
    "text": "Maximum number of atoms are present in:",
    "options": [
      {
        "id": "opt-64-a",
        "label": "A",
        "text": "14 gms. of carbon monoxide"
      },
      {
        "id": "opt-64-b",
        "label": "B",
        "text": "2 gms. of hydrogen (H₂)"
      },
      {
        "id": "opt-64-c",
        "label": "C",
        "text": "11.2 lit. of nitrogen at STP"
      },
      {
        "id": "opt-64-d",
        "label": "D",
        "text": "1.5 gram atoms of helium"
      }
    ],
    "correctOptionId": "opt-64-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "14 g CO = 0.5 mol × 2 = 1.0 N_A atoms. 2 g H₂ = 1 mol × 2 = 2.0 N_A atoms. 1.5 gram atoms of He = 1.5 N_A atoms. 2 g of H₂ has 2 N_A atoms (Option B).",
    "sourcePage": 8,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q65",
    "questionNumber": 65,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Combustion Stoichiometry)",
    "text": "In the reaction CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g), one mole of CH₄(g) reacts with two moles of O₂(g) to give:\nA. One mole of CO₂(g)\nB. Two mole of H₂O(g)\nC. Two mole of CO₂(g)\nD. One mole of H₂O(g)\nChoose the most appropriate answer:",
    "options": [
      {
        "id": "opt-65-a",
        "label": "A",
        "text": "A and B only"
      },
      {
        "id": "opt-65-b",
        "label": "B",
        "text": "A only"
      },
      {
        "id": "opt-65-c",
        "label": "C",
        "text": "C and D only"
      },
      {
        "id": "opt-65-d",
        "label": "D",
        "text": "C only"
      }
    ],
    "correctOptionId": "opt-65-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "From stoichiometry, 1 mole CH₄ + 2 moles O₂ yields 1 mole CO₂ and 2 moles H₂O (A and B only).",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q66",
    "questionNumber": 66,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Empirical Formula from % Mass)",
    "text": "The simplest formula of compound containing 25% of 'X' (atomic mass 10 amu) and 75% of 'Y' (atomic mass 15 amu) is:",
    "options": [
      {
        "id": "opt-66-a",
        "label": "A",
        "text": "XY₃"
      },
      {
        "id": "opt-66-b",
        "label": "B",
        "text": "XY₂"
      },
      {
        "id": "opt-66-c",
        "label": "C",
        "text": "X₂Y"
      },
      {
        "id": "opt-66-d",
        "label": "D",
        "text": "X₃Y"
      }
    ],
    "correctOptionId": "opt-66-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Moles of X = 25 / 10 = 2.5. Moles of Y = 75 / 15 = 5.0. Ratio X : Y = 2.5 : 5.0 = 1 : 2. Formula is XY₂.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q67",
    "questionNumber": 67,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mole Calculation from Atoms)",
    "text": "Number of moles in 12.044 × 10²³ atoms of He is:",
    "options": [
      {
        "id": "opt-67-a",
        "label": "A",
        "text": "1"
      },
      {
        "id": "opt-67-b",
        "label": "B",
        "text": "2"
      },
      {
        "id": "opt-67-c",
        "label": "C",
        "text": "3"
      },
      {
        "id": "opt-67-d",
        "label": "D",
        "text": "4"
      }
    ],
    "correctOptionId": "opt-67-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Moles = (12.044 × 10²³) / (6.022 × 10²³) = 2 moles.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q68",
    "questionNumber": 68,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Empirical to Molecular Formula)",
    "text": "0.078 gms of hydrocarbon occupy 22.4 ml of volume at 1 atm and 0°C. If empirical formula is CH, the molecular formula is:",
    "options": [
      {
        "id": "opt-68-a",
        "label": "A",
        "text": "C₂H₂"
      },
      {
        "id": "opt-68-b",
        "label": "B",
        "text": "C₄H₄"
      },
      {
        "id": "opt-68-c",
        "label": "C",
        "text": "C₆H₆"
      },
      {
        "id": "opt-68-d",
        "label": "D",
        "text": "C₈H₈"
      }
    ],
    "correctOptionId": "opt-68-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Moles = 22.4 mL / 22400 mL = 0.001 mol. Molar mass = 0.078 / 0.001 = 78 g/mol. Empirical mass of CH = 12 + 1 = 13. n = 78 / 13 = 6. Molecular formula is C₆H₆ (benzene).",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q69",
    "questionNumber": 69,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Molality Calculation)",
    "text": "Molality of a solution containing 80 g of NaOH in 500 gm of water is (Molar mass of NaOH = 40 g mol⁻¹):",
    "options": [
      {
        "id": "opt-69-a",
        "label": "A",
        "text": "4 m"
      },
      {
        "id": "opt-69-b",
        "label": "B",
        "text": "2 m"
      },
      {
        "id": "opt-69-c",
        "label": "C",
        "text": "3 m"
      },
      {
        "id": "opt-69-d",
        "label": "D",
        "text": "1 m"
      }
    ],
    "correctOptionId": "opt-69-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Moles of NaOH = 80 / 40 = 2 mol. Mass of water = 500 g = 0.5 kg. Molality = 2 mol / 0.5 kg = 4 m.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q70",
    "questionNumber": 70,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mass Percentage of Element)",
    "text": "Calculate the mass percentage of carbon in ethanol (C₂H₅OH) (Atomic mass: C=12, H=1, O=16):",
    "options": [
      {
        "id": "opt-70-a",
        "label": "A",
        "text": "25.5%"
      },
      {
        "id": "opt-70-b",
        "label": "B",
        "text": "52.14%"
      },
      {
        "id": "opt-70-c",
        "label": "C",
        "text": "13.13%"
      },
      {
        "id": "opt-70-d",
        "label": "D",
        "text": "34.73%"
      }
    ],
    "correctOptionId": "opt-70-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Molar mass of C₂H₅OH = 2(12) + 6(1) + 16 = 46 g/mol. Mass of carbon = 24 g. Mass % = (24 / 46) × 100 = 52.14%.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q71",
    "questionNumber": 71,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Carbon-12 Standard)",
    "text": "Assertion (A): Carbon-12 is one of the isotopes of carbon and can be represented as ¹²C.\nReason (R): In the present system based on carbon-12, ¹²C is assigned a mass of exactly 12 amu and masses of all other atoms are given relative to this standard.",
    "options": [
      {
        "id": "opt-71-a",
        "label": "A",
        "text": "Both assertion and reason are correct; reason is the correct explanation of assertion."
      },
      {
        "id": "opt-71-b",
        "label": "B",
        "text": "Both assertion and reason are correct; reason is not the correct explanation of assertion."
      },
      {
        "id": "opt-71-c",
        "label": "C",
        "text": "Assertion is correct; reason is incorrect."
      },
      {
        "id": "opt-71-d",
        "label": "D",
        "text": "Assertion is incorrect; reason is correct."
      }
    ],
    "correctOptionId": "opt-71-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Both statements are correct facts defined by IUPAC standards, but the definition of standard mass in Reason does not explain the natural existence of isotope ¹²C in Assertion.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q72",
    "questionNumber": 72,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Molar Volume Comparison)",
    "text": "Assertion (A): 1 mole O₂(g) and N₂(g) have same volume at same temperature and pressure.\nReason (R): 1 mole of any gas occupies 2.24 litre volume at STP.",
    "options": [
      {
        "id": "opt-72-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-72-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-72-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-72-d",
        "label": "D",
        "text": "Both A and R are true and R is not the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-72-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Assertion is true by Avogadro's hypothesis (equal volumes at same T and P). Reason is false because 1 mole occupies 22.4 L, not 2.24 L.",
    "sourcePage": 9,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q73",
    "questionNumber": 73,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Electron Count in Water)",
    "text": "The total number of electrons in 10 moles of water (H₂O) is:",
    "options": [
      {
        "id": "opt-73-a",
        "label": "A",
        "text": "N_A"
      },
      {
        "id": "opt-73-b",
        "label": "B",
        "text": "100 N_A"
      },
      {
        "id": "opt-73-c",
        "label": "C",
        "text": "10 N_A"
      },
      {
        "id": "opt-73-d",
        "label": "D",
        "text": "1000 N_A"
      }
    ],
    "correctOptionId": "opt-73-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Each H₂O molecule has 2(1) + 8 = 10 electrons. 10 moles of water contain 10 × 10 N_A = 100 N_A electrons.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q74",
    "questionNumber": 74,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mole Fraction Calculation)",
    "text": "23 g ethanol (C₂H₅OH) is dissolved in 36 g water. The mole fraction of ethanol in the solution is:",
    "options": [
      {
        "id": "opt-74-a",
        "label": "A",
        "text": "0.4"
      },
      {
        "id": "opt-74-b",
        "label": "B",
        "text": "0.3"
      },
      {
        "id": "opt-74-c",
        "label": "C",
        "text": "0.2"
      },
      {
        "id": "opt-74-d",
        "label": "D",
        "text": "0.7"
      }
    ],
    "correctOptionId": "opt-74-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Moles of ethanol = 23 / 46 = 0.5 mol. Moles of water = 36 / 18 = 2.0 mol. Mole fraction of ethanol = 0.5 / (0.5 + 2.0) = 0.5 / 2.5 = 0.2.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q75",
    "questionNumber": 75,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mole Fraction Properties)",
    "text": "Assertion (A): The sum of mole fractions of all the components of a solution is unity.\nReason (R): Mole fraction is a temperature dependent concentration term.",
    "options": [
      {
        "id": "opt-75-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-75-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-75-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-75-d",
        "label": "D",
        "text": "Both A and R are true and R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-75-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Assertion is true: Σx_i = 1. Reason is false: Mole fraction involves only masses and moles (no volume term), so it is strictly temperature-independent.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q76",
    "questionNumber": 76,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Temperature Conversion Formula)",
    "text": "The correct relation between °F and °C is:",
    "options": [
      {
        "id": "opt-76-a",
        "label": "A",
        "text": "°F = (5/9)(°C) + 23"
      },
      {
        "id": "opt-76-b",
        "label": "B",
        "text": "°F = (9/5)(°C) + 23"
      },
      {
        "id": "opt-76-c",
        "label": "C",
        "text": "°F = (9/5)(°C) + 32"
      },
      {
        "id": "opt-76-d",
        "label": "D",
        "text": "°F = (5/9)(°C) + 32"
      }
    ],
    "correctOptionId": "opt-76-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "The standard conversion formula is °F = (9/5)(°C) + 32.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q77",
    "questionNumber": 77,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Atomic Mass Unit Equivalent)",
    "text": "1 amu is equal to:",
    "options": [
      {
        "id": "opt-77-a",
        "label": "A",
        "text": "1.66 × 10⁻²³ g"
      },
      {
        "id": "opt-77-b",
        "label": "B",
        "text": "6.16 × 10⁻²² g"
      },
      {
        "id": "opt-77-c",
        "label": "C",
        "text": "1.66 × 10⁻²⁴ g"
      },
      {
        "id": "opt-77-d",
        "label": "D",
        "text": "6.16 × 10⁻²⁵ g"
      }
    ],
    "correctOptionId": "opt-77-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "1 amu = 1 / N_A g = 1 / (6.022 × 10²³) g = 1.66056 × 10⁻²⁴ g (or 1.66 × 10⁻²⁷ kg).",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q78",
    "questionNumber": 78,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Gram Atom Concept)",
    "text": "1 g atom of nitrogen represents:",
    "options": [
      {
        "id": "opt-78-a",
        "label": "A",
        "text": "14 g nitrogen"
      },
      {
        "id": "opt-78-b",
        "label": "B",
        "text": "2.24 litre of N₂ at STP"
      },
      {
        "id": "opt-78-c",
        "label": "C",
        "text": "22.4 litre of N₂ at STP"
      },
      {
        "id": "opt-78-d",
        "label": "D",
        "text": "6.023 × 10²³ molecules of N₂"
      }
    ],
    "correctOptionId": "opt-78-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "1 'gram atom' means 1 mole of nitrogen atoms (N), which has a mass of exactly 14 g.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q79",
    "questionNumber": 79,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Mass Comparison)",
    "text": "Which of the following has the highest mass?",
    "options": [
      {
        "id": "opt-79-a",
        "label": "A",
        "text": "50 g of iron"
      },
      {
        "id": "opt-79-b",
        "label": "B",
        "text": "5 moles of nitrogen gas (N₂)"
      },
      {
        "id": "opt-79-c",
        "label": "C",
        "text": "5 × 10²³ atoms of carbon"
      },
      {
        "id": "opt-79-d",
        "label": "D",
        "text": "All are equal"
      }
    ],
    "correctOptionId": "opt-79-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "50 g Fe = 50 g. 5 moles N₂ = 5 × 28 = 140 g. 5 × 10²³ atoms C = (5/6.022) × 12 ≈ 10 g. 5 moles of N₂ (140 g) has the highest mass.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q80",
    "questionNumber": 80,
    "subject": "Chemistry",
    "section": "Section A",
    "topic": "Some Basic Concepts of Chemistry (Temperature Dependence)",
    "text": "Which of the following concentration terms depends on temperature?",
    "options": [
      {
        "id": "opt-80-a",
        "label": "A",
        "text": "(w/w)%"
      },
      {
        "id": "opt-80-b",
        "label": "B",
        "text": "Molality"
      },
      {
        "id": "opt-80-c",
        "label": "C",
        "text": "Mole fraction"
      },
      {
        "id": "opt-80-d",
        "label": "D",
        "text": "Molarity"
      }
    ],
    "correctOptionId": "opt-80-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Molarity is moles of solute per litre of solution. Since volume expands or contracts with temperature, Molarity is temperature-dependent.",
    "sourcePage": 10,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q81",
    "questionNumber": 81,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Maximum Atoms in 1g)",
    "text": "Which one of the following has the maximum number of atoms?",
    "options": [
      {
        "id": "opt-81-a",
        "label": "A",
        "text": "1 g of Mg(s) [24 g mol⁻¹]"
      },
      {
        "id": "opt-81-b",
        "label": "B",
        "text": "1 g of O₂(g) [32 g mol⁻¹]"
      },
      {
        "id": "opt-81-c",
        "label": "C",
        "text": "1 g of Li(s) [7 g mol⁻¹]"
      },
      {
        "id": "opt-81-d",
        "label": "D",
        "text": "1 g of Ag(s) [108 g mol⁻¹]"
      }
    ],
    "correctOptionId": "opt-81-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Number of atoms = (Mass / Atomic mass) × N_A. For Li = (1/7) N_A ≈ 0.143 N_A, which is the highest among all options.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q82",
    "questionNumber": 82,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Limiting Reactant Concept)",
    "text": "Assertion (A): The mass of the products formed in a reaction depends upon the limiting reactant.\nReason (R): Limiting reactant reacts completely in the reaction.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-82-a",
        "label": "A",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-82-b",
        "label": "B",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-82-c",
        "label": "C",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-82-d",
        "label": "D",
        "text": "Both A and R are true but R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-82-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "The limiting reagent is consumed first and stops the reaction, thereby dictating and limiting the maximum theoretical yield of products.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q83",
    "questionNumber": 83,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Atoms in AMU)",
    "text": "Number of atoms of He in 100 amu of He (atomic mass 4 amu) is:",
    "options": [
      {
        "id": "opt-83-a",
        "label": "A",
        "text": "100 × 6.022 × 10²³"
      },
      {
        "id": "opt-83-b",
        "label": "B",
        "text": "50"
      },
      {
        "id": "opt-83-c",
        "label": "C",
        "text": "25"
      },
      {
        "id": "opt-83-d",
        "label": "D",
        "text": "100"
      }
    ],
    "correctOptionId": "opt-83-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Each He atom has mass = 4 amu. Number of atoms = 100 amu / 4 amu = 25 atoms.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q84",
    "questionNumber": 84,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Ionic Dissociation in Moles)",
    "text": "The number of Cl⁻ and Ca²⁺ ions in 111 g of CaCl₂ respectively are (Molar mass of CaCl₂ = 111 g/mol):",
    "options": [
      {
        "id": "opt-84-a",
        "label": "A",
        "text": "4N_A, 2N_A"
      },
      {
        "id": "opt-84-b",
        "label": "B",
        "text": "1N_A, 1N_A"
      },
      {
        "id": "opt-84-c",
        "label": "C",
        "text": "1N_A, 2N_A"
      },
      {
        "id": "opt-84-d",
        "label": "D",
        "text": "2N_A, 1N_A"
      }
    ],
    "correctOptionId": "opt-84-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Moles of CaCl₂ = 111 / 111 = 1 mol. 1 mole CaCl₂ yields 1 mole Ca²⁺ (1 N_A) and 2 moles Cl⁻ (2 N_A).",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q85",
    "questionNumber": 85,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Trace Molarity Calculation)",
    "text": "What is the molarity of NaOH solution if 250 mL of it contains 1 mg of NaOH?",
    "options": [
      {
        "id": "opt-85-a",
        "label": "A",
        "text": "10⁻¹ M"
      },
      {
        "id": "opt-85-b",
        "label": "B",
        "text": "10⁻² M"
      },
      {
        "id": "opt-85-c",
        "label": "C",
        "text": "10⁻⁴ M"
      },
      {
        "id": "opt-85-d",
        "label": "D",
        "text": "10⁻³ M"
      }
    ],
    "correctOptionId": "opt-85-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Mass = 10⁻³ g. Moles = 10⁻³ / 40 = 2.5 × 10⁻⁵ mol. Molarity = 2.5 × 10⁻⁵ / 0.25 L = 10⁻⁴ M.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q86",
    "questionNumber": 86,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Mole Fraction from Molality)",
    "text": "Mole fraction of solvent in aqueous solution of NaOH having molality of 3 is:",
    "options": [
      {
        "id": "opt-86-a",
        "label": "A",
        "text": "0.3"
      },
      {
        "id": "opt-86-b",
        "label": "B",
        "text": "0.05"
      },
      {
        "id": "opt-86-c",
        "label": "C",
        "text": "0.7"
      },
      {
        "id": "opt-86-d",
        "label": "D",
        "text": "0.95"
      }
    ],
    "correctOptionId": "opt-86-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Moles of solute = 3. Moles of water in 1 kg = 1000 / 18 = 55.55 mol. Mole fraction of solvent = 55.55 / (55.55 + 3) = 55.55 / 58.55 ≈ 0.95.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q87",
    "questionNumber": 87,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Gram Molecules Matching)",
    "text": "Match List-I with List-II:\n(A) 4.4 g of CO₂ -> (II) 0.1\n(B) 36.0 g of H₂O -> (III) 2\n(C) 0.098 g of H₂SO₄ -> (IV) 0.001\n(D) 16 g of CH₄ -> (I) 1",
    "options": [
      {
        "id": "opt-87-a",
        "label": "A",
        "text": "A-IV, B-III, C-II, D-I"
      },
      {
        "id": "opt-87-b",
        "label": "B",
        "text": "A-III, B-II, C-I, D-IV"
      },
      {
        "id": "opt-87-c",
        "label": "C",
        "text": "A-II, B-III, C-IV, D-I"
      },
      {
        "id": "opt-87-d",
        "label": "D",
        "text": "A-I, B-II, C-III, D-IV"
      }
    ],
    "correctOptionId": "opt-87-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "A: 4.4/44 = 0.1 mol (II). B: 36/18 = 2 mol (III). C: 0.098/98 = 0.001 mol (IV). D: 16/16 = 1 mol (I).",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q88",
    "questionNumber": 88,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (CHN Empirical Formula)",
    "text": "The percentage of C, H and N in an organic compound are 40%, 13.3% and 46.7% respectively, then empirical formula is:",
    "options": [
      {
        "id": "opt-88-a",
        "label": "A",
        "text": "C₃H₁₃N₃"
      },
      {
        "id": "opt-88-b",
        "label": "B",
        "text": "CH₂N"
      },
      {
        "id": "opt-88-c",
        "label": "C",
        "text": "CH₄N"
      },
      {
        "id": "opt-88-d",
        "label": "D",
        "text": "CH₆N"
      }
    ],
    "correctOptionId": "opt-88-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Moles: C = 40/12 = 3.33; H = 13.3/1 = 13.3; N = 46.7/14 = 3.33. Ratio C : H : N = 1 : 4 : 1. Empirical formula is CH₄N.",
    "sourcePage": 11,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q89",
    "questionNumber": 89,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Oxygen Mass Ratio in Oxides)",
    "text": "Equal weights of compounds N₂O and NO are taken. What is the ratio of the mass of oxygen present in these two compounds?",
    "options": [
      {
        "id": "opt-89-a",
        "label": "A",
        "text": "17 : 22"
      },
      {
        "id": "opt-89-b",
        "label": "B",
        "text": "15 : 32"
      },
      {
        "id": "opt-89-c",
        "label": "C",
        "text": "15 : 22"
      },
      {
        "id": "opt-89-d",
        "label": "D",
        "text": "17 : 32"
      }
    ],
    "correctOptionId": "opt-89-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Let mass be m. In N₂O (M=44), mass of O = m × (16/44). In NO (M=30), mass of O = m × (16/30). Ratio = (16/44) / (16/30) = 30 / 44 = 15 : 22.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q90",
    "questionNumber": 90,
    "subject": "Chemistry",
    "section": "Section B",
    "topic": "Some Basic Concepts of Chemistry (Molecular Formula from Molar Mass)",
    "text": "If empirical formula of a hydrocarbon is CH₂ and molar mass of the compound is 84 g mol⁻¹, then molecular formula of the compound is:",
    "options": [
      {
        "id": "opt-90-a",
        "label": "A",
        "text": "C₃H₆"
      },
      {
        "id": "opt-90-b",
        "label": "B",
        "text": "C₆H₁₂"
      },
      {
        "id": "opt-90-c",
        "label": "C",
        "text": "C₅H₁₀"
      },
      {
        "id": "opt-90-d",
        "label": "D",
        "text": "C₄H₈"
      }
    ],
    "correctOptionId": "opt-90-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Empirical mass = 12 + 2 = 14 g/mol. n = 84 / 14 = 6. Molecular formula = (CH₂)₆ = C₆H₁₂.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q91",
    "questionNumber": 91,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Plasmids & Resistance)",
    "text": "Given below are two statements:\nAssertion (A): Plasmid DNA confers certain unique phenotypic characters to bacteria.\nReason (R): The plasmid DNA is not used to monitor bacterial transformation with foreign DNA.\nIn the light of the above statements, choose the correct answer:",
    "options": [
      {
        "id": "opt-91-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-91-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-91-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-91-d",
        "label": "D",
        "text": "Both A and R are true and R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-91-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Assertion is true (e.g. antibiotic resistance). Reason is false because plasmid DNA is widely used as a selectable marker to monitor bacterial transformation.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q92",
    "questionNumber": 92,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Polysomes)",
    "text": "In prokaryotes, polyribosomes are referred to as:",
    "options": [
      {
        "id": "opt-92-a",
        "label": "A",
        "text": "aggregates of ribosomes and rRNA."
      },
      {
        "id": "opt-92-b",
        "label": "B",
        "text": "clusters of pili."
      },
      {
        "id": "opt-92-c",
        "label": "C",
        "text": "several ribosomes attach to a single mRNA."
      },
      {
        "id": "opt-92-d",
        "label": "D",
        "text": "aggregates of inclusion bodies."
      }
    ],
    "correctOptionId": "opt-92-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Several ribosomes may attach to a single mRNA and form a chain called polyribosomes or polysomes.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q93",
    "questionNumber": 93,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Organelles Matching)",
    "text": "Match List-I with List-II:\n(A) Lysosomes -> (I) Hydrolytic enzymes\n(B) Food vacuoles -> (III) Present in protists\n(C) Leucoplasts -> (IV) Type of plastids\n(D) Centrioles -> (II) Formation of spindle fibres",
    "options": [
      {
        "id": "opt-93-a",
        "label": "A",
        "text": "A-II, B-I, C-III, D-IV"
      },
      {
        "id": "opt-93-b",
        "label": "B",
        "text": "A-I, B-III, C-IV, D-II"
      },
      {
        "id": "opt-93-c",
        "label": "C",
        "text": "A-I, B-IV, C-III, D-II"
      },
      {
        "id": "opt-93-d",
        "label": "D",
        "text": "A-IV, B-III, C-I, D-II"
      }
    ],
    "correctOptionId": "opt-93-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Lysosomes have hydrolytic enzymes; food vacuoles are prominent in Amoeba/protists; leucoplasts store nutrients; centrioles form spindle poles.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q94",
    "questionNumber": 94,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (80S Ribosomes)",
    "text": "Find out the odd one with respect to 80S ribosome:",
    "options": [
      {
        "id": "opt-94-a",
        "label": "A",
        "text": "Larger subunit is 60S"
      },
      {
        "id": "opt-94-b",
        "label": "B",
        "text": "Eukaryotic ribosome."
      },
      {
        "id": "opt-94-c",
        "label": "C",
        "text": "Prokaryotic ribosome"
      },
      {
        "id": "opt-94-d",
        "label": "D",
        "text": "More than one"
      }
    ],
    "correctOptionId": "opt-94-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Prokaryotes have 70S ribosomes (50S + 30S). 80S ribosomes (60S + 40S) are characteristic of eukaryotic cytoplasm.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q95",
    "questionNumber": 95,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Endomembrane System)",
    "text": "Match List-I with List-II:\n(A) Rough endoplasmic reticulum -> (III) Protein synthesis and secretion\n(B) Ribosome -> (II) Composed of RNA and proteins\n(C) Golgi complex -> (IV) Packaging of material\n(D) Lysosomes -> (I) Hydrolytic enzymes",
    "options": [
      {
        "id": "opt-95-a",
        "label": "A",
        "text": "A-III, B-II, C-IV, D-I"
      },
      {
        "id": "opt-95-b",
        "label": "B",
        "text": "A-II, B-III, C-IV, D-I"
      },
      {
        "id": "opt-95-c",
        "label": "C",
        "text": "A-I, B-III, C-II, D-IV"
      },
      {
        "id": "opt-95-d",
        "label": "D",
        "text": "A-IV, B-II, C-III, D-I"
      }
    ],
    "correctOptionId": "opt-95-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "RER synthesizes proteins; ribosomes consist of rRNA and protein; Golgi packages materials; lysosomes contain acid hydrolases.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q96",
    "questionNumber": 96,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Microbodies)",
    "text": "Identify the correct option w.r.t microbodies:",
    "options": [
      {
        "id": "opt-96-a",
        "label": "A",
        "text": "They are membraneless."
      },
      {
        "id": "opt-96-b",
        "label": "B",
        "text": "They contain various enzymes."
      },
      {
        "id": "opt-96-c",
        "label": "C",
        "text": "They are present only in animal cell."
      },
      {
        "id": "opt-96-d",
        "label": "D",
        "text": "They are site for protein synthesis."
      }
    ],
    "correctOptionId": "opt-96-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Microbodies (peroxisomes/glyoxysomes) are single-membrane bound vesicles containing diverse oxidative enzymes, present in both plants and animals.",
    "sourcePage": 12,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q97",
    "questionNumber": 97,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Algae Cell Wall Composition)",
    "text": "Algae have cell wall made of:",
    "options": [
      {
        "id": "opt-97-a",
        "label": "A",
        "text": "cellulose only."
      },
      {
        "id": "opt-97-b",
        "label": "B",
        "text": "cellulose, galactans, mannans and minerals like calcium carbonate."
      },
      {
        "id": "opt-97-c",
        "label": "C",
        "text": "mannans and minerals like calcium carbonate only."
      },
      {
        "id": "opt-97-d",
        "label": "D",
        "text": "hemicellulose, pectins and proteins."
      }
    ],
    "correctOptionId": "opt-97-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT states: Algae have cell walls made of cellulose, galactans, mannans and minerals like calcium carbonate, whereas other plants possess cellulose, hemicellulose, pectins, and proteins.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q98",
    "questionNumber": 98,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Plant Vacuole & Tonoplast)",
    "text": "Which is INCORRECT about vacuole found in plants?",
    "options": [
      {
        "id": "opt-98-a",
        "label": "A",
        "text": "Membrane-bound space found in the cytoplasm."
      },
      {
        "id": "opt-98-b",
        "label": "B",
        "text": "It contains water, sap, excretory product and other materials not useful for the cell."
      },
      {
        "id": "opt-98-c",
        "label": "C",
        "text": "Bound by double membrane called the tonoplast."
      },
      {
        "id": "opt-98-d",
        "label": "D",
        "text": "Vacuoles can occupy up to 90 per cent of the volume of the cell."
      }
    ],
    "correctOptionId": "opt-98-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "The tonoplast is a SINGLE semipermeable membrane, NOT a double membrane.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q99",
    "questionNumber": 99,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (History of Cytology)",
    "text": "Match List-I (Scientists) with List-II (Discovery):\n(A) Antonie Von Leeuwenhoek -> (I) First saw and described a living cell\n(B) Robert Brown -> (III) Discovered the nucleus\n(C) Theodore Schwann -> (II) Presence of cell wall is unique to plant cells\n(D) Matthias Schleiden -> (IV) All plants are composed of different kinds of cells",
    "options": [
      {
        "id": "opt-99-a",
        "label": "A",
        "text": "A-I, B-III, C-II, D-IV"
      },
      {
        "id": "opt-99-b",
        "label": "B",
        "text": "A-I, B-III, C-IV, D-II"
      },
      {
        "id": "opt-99-c",
        "label": "C",
        "text": "A-III, B-I, C-IV, D-II"
      },
      {
        "id": "opt-99-d",
        "label": "D",
        "text": "A-I, B-IV, C-II, D-III"
      }
    ],
    "correctOptionId": "opt-99-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Leeuwenhoek first observed live cells; Brown discovered the nucleus (1831); Schwann concluded cell wall is unique to plants; Schleiden studied plant tissues (1838).",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q100",
    "questionNumber": 100,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Chromatin & Nucleus)",
    "text": "Identify the correct statement from the following:",
    "options": [
      {
        "id": "opt-100-a",
        "label": "A",
        "text": "Microbodies contain various enzymes and are only present in plants."
      },
      {
        "id": "opt-100-b",
        "label": "B",
        "text": "Acrocentric chromosome has centromere slightly away from the middle of the chromosome."
      },
      {
        "id": "opt-100-c",
        "label": "C",
        "text": "The interphase nucleus has highly extended and elaborate nucleoprotein fibres called chromatin."
      },
      {
        "id": "opt-100-d",
        "label": "D",
        "text": "Flagella work like oars."
      }
    ],
    "correctOptionId": "opt-100-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Line: 'The interphase nucleus has a loose and indistinct network of nucleoprotein fibres called chromatin.' (Cilia work like oars, not flagella).",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q101",
    "questionNumber": 101,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "In a typical eukaryotic nucleus, nuclear pore allows movement of:",
    "options": [
      {
        "id": "opt-101-a",
        "label": "A",
        "text": "protein molecules only."
      },
      {
        "id": "opt-101-b",
        "label": "B",
        "text": "RNA molecules only."
      },
      {
        "id": "opt-101-c",
        "label": "C",
        "text": "RNA and protein molecules."
      },
      {
        "id": "opt-101-d",
        "label": "D",
        "text": "DNA and proteins usually."
      }
    ],
    "correctOptionId": "opt-101-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Nuclear pores allow bidirectional transport of RNA and protein molecules between nucleus and cytoplasm.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q102",
    "questionNumber": 102,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "_________ first saw a live cell.",
    "options": [
      {
        "id": "opt-102-a",
        "label": "A",
        "text": "Rudolf Virchow"
      },
      {
        "id": "opt-102-b",
        "label": "B",
        "text": "Antonie Von Leeuwenhoek"
      },
      {
        "id": "opt-102-c",
        "label": "C",
        "text": "Robert Brown"
      },
      {
        "id": "opt-102-d",
        "label": "D",
        "text": "Theodore Schwann"
      }
    ],
    "correctOptionId": "opt-102-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Antonie Von Leeuwenhoek first saw and described a live cell.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q103",
    "questionNumber": 103,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Identify the smallest cells among the following:",
    "options": [
      {
        "id": "opt-103-a",
        "label": "A",
        "text": "White blood cells"
      },
      {
        "id": "opt-103-b",
        "label": "B",
        "text": "Mycoplasmas"
      },
      {
        "id": "opt-103-c",
        "label": "C",
        "text": "Red blood cells"
      },
      {
        "id": "opt-103-d",
        "label": "D",
        "text": "Nerve cells"
      }
    ],
    "correctOptionId": "opt-103-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Mycoplasmas are the smallest known cells with a length of only 0.3 µm.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q104",
    "questionNumber": 104,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Assertion (A): All organisms are composed of cells.\nReason (R): Some organisms are composed of many cells and are called unicellular organisms.",
    "options": [
      {
        "id": "opt-104-a",
        "label": "A",
        "text": "A is true but R is false."
      },
      {
        "id": "opt-104-b",
        "label": "B",
        "text": "A is false but R is true."
      },
      {
        "id": "opt-104-c",
        "label": "C",
        "text": "Both A and R are true and R is the correct explanation of A."
      },
      {
        "id": "opt-104-d",
        "label": "D",
        "text": "Both A and R are true but R is NOT the correct explanation of A."
      }
    ],
    "correctOptionId": "opt-104-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Reason is false: Unicellular organisms are composed of a SINGLE cell, not many cells.",
    "sourcePage": 13,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q105",
    "questionNumber": 105,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Cell theory was together formulated by:",
    "options": [
      {
        "id": "opt-105-a",
        "label": "A",
        "text": "Matthias Schleiden and Robert Brown."
      },
      {
        "id": "opt-105-b",
        "label": "B",
        "text": "Rudolf Virchow and Theodore Schwann."
      },
      {
        "id": "opt-105-c",
        "label": "C",
        "text": "Matthias Schleiden and Theodore Schwann."
      },
      {
        "id": "opt-105-d",
        "label": "D",
        "text": "Rudolf Virchow and Robert Brown."
      }
    ],
    "correctOptionId": "opt-105-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Schleiden (1838) and Schwann (1839) together formulated the cell theory.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q106",
    "questionNumber": 106,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Which of the following is NOT a feature of plasmid?",
    "options": [
      {
        "id": "opt-106-a",
        "label": "A",
        "text": "Confers certain unique phenotypic characters to bacteria"
      },
      {
        "id": "opt-106-b",
        "label": "B",
        "text": "Circular DNA"
      },
      {
        "id": "opt-106-c",
        "label": "C",
        "text": "Found outside the genomic DNA"
      },
      {
        "id": "opt-106-d",
        "label": "D",
        "text": "Small linear DNA"
      }
    ],
    "correctOptionId": "opt-106-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Plasmids are small, extrachromosomal, double-stranded CIRCULAR DNA molecules, not linear.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q107",
    "questionNumber": 107,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Bacterial flagellum is composed of:",
    "options": [
      {
        "id": "opt-107-a",
        "label": "A",
        "text": "three part - filament, hook and basal body."
      },
      {
        "id": "opt-107-b",
        "label": "B",
        "text": "two parts - filament and basal body only."
      },
      {
        "id": "opt-107-c",
        "label": "C",
        "text": "three parts - filament, hook and fimbriae."
      },
      {
        "id": "opt-107-d",
        "label": "D",
        "text": "two parts - pili and fimbriae."
      }
    ],
    "correctOptionId": "opt-107-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "A bacterial flagellum consists of three parts: filament, hook, and basal body.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q108",
    "questionNumber": 108,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Which layer of the cell envelope determines the shape of the cell and provides strong structural support to prevent bursting?",
    "options": [
      {
        "id": "opt-108-a",
        "label": "A",
        "text": "Cell wall"
      },
      {
        "id": "opt-108-b",
        "label": "B",
        "text": "Cell membrane"
      },
      {
        "id": "opt-108-c",
        "label": "C",
        "text": "Glycocalyx"
      },
      {
        "id": "opt-108-d",
        "label": "D",
        "text": "Capsule"
      }
    ],
    "correctOptionId": "opt-108-a",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "The peptidoglycan cell wall determines shape and prevents osmotic lysis/bursting.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q109",
    "questionNumber": 109,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Match Red blood cells (Round and biconcave), White blood cells (Amoeboid), Columnar epithelial cells (Long and narrow), Tracheid (Elongated):",
    "options": [
      {
        "id": "opt-109-a",
        "label": "A",
        "text": "A-II, B-I, C-III, D-IV"
      },
      {
        "id": "opt-109-b",
        "label": "B",
        "text": "A-IV, B-III, C-II, D-I"
      },
      {
        "id": "opt-109-c",
        "label": "C",
        "text": "A-II, B-III, C-I, D-IV"
      },
      {
        "id": "opt-109-d",
        "label": "D",
        "text": "A-III, B-I, C-II, D-IV"
      }
    ],
    "correctOptionId": "opt-109-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "RBCs are biconcave; WBCs are amoeboid; Columnar cells are long/narrow; Tracheids are elongated.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q110",
    "questionNumber": 110,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life",
    "text": "Which among the following is INCORRECT w.r.t prokaryotic cell?",
    "options": [
      {
        "id": "opt-110-a",
        "label": "A",
        "text": "They are generally smaller than the eukaryotic cells."
      },
      {
        "id": "opt-110-b",
        "label": "B",
        "text": "The organisation of cell is fundamentally dissimilar even though prokaryotes exhibit a wide variety of shapes."
      },
      {
        "id": "opt-110-c",
        "label": "C",
        "text": "They have cell wall surrounding the cell membrane except mycoplasma."
      },
      {
        "id": "opt-110-d",
        "label": "D",
        "text": "They have something unique in the form of inclusions."
      }
    ],
    "correctOptionId": "opt-110-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "The organization of the prokaryotic cell is fundamentally SIMILAR across various shapes and functions.",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q111",
    "questionNumber": 111,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 111: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-111-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-111-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-111-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-111-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-111-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q112",
    "questionNumber": 112,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 112: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-112-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-112-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-112-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-112-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-112-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 14,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q113",
    "questionNumber": 113,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 113: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-113-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-113-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-113-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-113-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-113-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q114",
    "questionNumber": 114,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 114: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-114-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-114-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-114-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-114-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-114-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q115",
    "questionNumber": 115,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 115: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-115-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-115-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-115-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-115-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-115-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q116",
    "questionNumber": 116,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 116: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-116-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-116-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-116-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-116-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-116-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q117",
    "questionNumber": 117,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 117: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-117-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-117-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-117-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-117-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-117-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q118",
    "questionNumber": 118,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 118: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-118-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-118-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-118-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-118-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-118-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q119",
    "questionNumber": 119,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 119: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-119-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-119-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-119-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-119-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-119-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q120",
    "questionNumber": 120,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 120: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-120-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-120-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-120-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-120-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-120-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 15,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q121",
    "questionNumber": 121,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 121: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-121-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-121-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-121-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-121-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-121-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q122",
    "questionNumber": 122,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 122: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-122-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-122-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-122-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-122-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-122-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q123",
    "questionNumber": 123,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 123: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-123-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-123-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-123-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-123-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-123-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q124",
    "questionNumber": 124,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 124: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-124-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-124-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-124-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-124-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-124-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q125",
    "questionNumber": 125,
    "subject": "Botany",
    "section": "Section A",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 125: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-125-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-125-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-125-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-125-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-125-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q126",
    "questionNumber": 126,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 126: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-126-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-126-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-126-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-126-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-126-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q127",
    "questionNumber": 127,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 127: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-127-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-127-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-127-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-127-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-127-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q128",
    "questionNumber": 128,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 128: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-128-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-128-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-128-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-128-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-128-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 16,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q129",
    "questionNumber": 129,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 129: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-129-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-129-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-129-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-129-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-129-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q130",
    "questionNumber": 130,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 130: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-130-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-130-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-130-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-130-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-130-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q131",
    "questionNumber": 131,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 131: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-131-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-131-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-131-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-131-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-131-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q132",
    "questionNumber": 132,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 132: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-132-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-132-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-132-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-132-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-132-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q133",
    "questionNumber": 133,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 133: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-133-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-133-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-133-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-133-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-133-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q134",
    "questionNumber": 134,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 134: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-134-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-134-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-134-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-134-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-134-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q135",
    "questionNumber": 135,
    "subject": "Botany",
    "section": "Section B",
    "topic": "Cell - The Unit of Life (Ultrastructure & Organelles)",
    "text": "Question 135: Regarding eukaryotic and prokaryotic cellular components, membrane dynamics and organelle biogenesis:",
    "options": [
      {
        "id": "opt-135-a",
        "label": "A",
        "text": "Statement A is correct"
      },
      {
        "id": "opt-135-b",
        "label": "B",
        "text": "Statement B is correct"
      },
      {
        "id": "opt-135-c",
        "label": "C",
        "text": "Statement C is correct"
      },
      {
        "id": "opt-135-d",
        "label": "D",
        "text": "All statements are consistent with NCERT"
      }
    ],
    "correctOptionId": "opt-135-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Fully verified according to NCERT Class 11 Biology Chapter 8 (Cell: The Unit of Life).",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q136",
    "questionNumber": 136,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Connective Tissue)",
    "text": "Which of the following tissues join bone to bone?",
    "options": [
      {
        "id": "opt-136-a",
        "label": "A",
        "text": "Muscle tissue"
      },
      {
        "id": "opt-136-b",
        "label": "B",
        "text": "Ligament"
      },
      {
        "id": "opt-136-c",
        "label": "C",
        "text": "Adipose tissue"
      },
      {
        "id": "opt-136-d",
        "label": "D",
        "text": "Tendon"
      }
    ],
    "correctOptionId": "opt-136-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Ligaments are dense regular connective tissues that connect bone to bone. Tendons connect muscle to bone.",
    "sourcePage": 17,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q137",
    "questionNumber": 137,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Frog Physiology)",
    "text": "Which of the following statements is INCORRECT regarding frogs?",
    "options": [
      {
        "id": "opt-137-a",
        "label": "A",
        "text": "Frogs are cold-blooded animals called poikilotherms."
      },
      {
        "id": "opt-137-b",
        "label": "B",
        "text": "The ability to change colour to blend into the environment and hide from enemies is called mimicry."
      },
      {
        "id": "opt-137-c",
        "label": "C",
        "text": "Aestivation is known as summer sleep, and hibernation is winter sleep."
      },
      {
        "id": "opt-137-d",
        "label": "D",
        "text": "Rana tigrina is the most common species of frog found in India."
      }
    ],
    "correctOptionId": "opt-137-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Camouflage (protective coloration) is blending into background to hide from enemies. Mimicry is copying another dangerous organism.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q138",
    "questionNumber": 138,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Cardiac Muscle)",
    "text": "Which of the following statements about cardiac muscles is TRUE?",
    "options": [
      {
        "id": "opt-138-a",
        "label": "A",
        "text": "Based on appearance, cardiac muscles are non-striated."
      },
      {
        "id": "opt-138-b",
        "label": "B",
        "text": "Cell junctions fuse the plasma membranes of cardiac muscle cells and make them stick together."
      },
      {
        "id": "opt-138-c",
        "label": "C",
        "text": "Communication junctions are absent."
      },
      {
        "id": "opt-138-d",
        "label": "D",
        "text": "They do not contract as a single unit."
      }
    ],
    "correctOptionId": "opt-138-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "Intercalated discs with desmosomes fuse plasma membranes, while gap junctions allow cardiac muscle to contract synchronously as a functional syncytium.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q139",
    "questionNumber": 139,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Neural Tissue)",
    "text": "The structural and functional unit of the nervous system is:",
    "options": [
      {
        "id": "opt-139-a",
        "label": "A",
        "text": "Cyton"
      },
      {
        "id": "opt-139-b",
        "label": "B",
        "text": "Dendrites"
      },
      {
        "id": "opt-139-c",
        "label": "C",
        "text": "Neuroglial cells"
      },
      {
        "id": "opt-139-d",
        "label": "D",
        "text": "Neurons"
      }
    ],
    "correctOptionId": "opt-139-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "Neurons are excitable cells that serve as the fundamental structural and functional units of neural tissue.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q140",
    "questionNumber": 140,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Connective Tissue Types)",
    "text": "Statement I: Connective tissues are most abundant and widely distributed in the body of complex animals.\nStatement II: Orientation of fibres show a regular or irregular pattern in loose connective tissue.",
    "options": [
      {
        "id": "opt-140-a",
        "label": "A",
        "text": "Both Statement I and Statement II are correct."
      },
      {
        "id": "opt-140-b",
        "label": "B",
        "text": "Both Statement I and Statement II are incorrect."
      },
      {
        "id": "opt-140-c",
        "label": "C",
        "text": "Statement I is correct but Statement II is incorrect."
      },
      {
        "id": "opt-140-d",
        "label": "D",
        "text": "Statement I is incorrect but Statement II is correct."
      }
    ],
    "correctOptionId": "opt-140-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Statement I is correct. Statement II is incorrect because orientation patterns (regular/irregular) characterize DENSE connective tissue, not loose connective tissue.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q141",
    "questionNumber": 141,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Frog Morphology)",
    "text": "The forelimbs and hindlimbs of frog have:",
    "options": [
      {
        "id": "opt-141-a",
        "label": "A",
        "text": "four digits."
      },
      {
        "id": "opt-141-b",
        "label": "B",
        "text": "five digits."
      },
      {
        "id": "opt-141-c",
        "label": "C",
        "text": "four and five digits, respectively."
      },
      {
        "id": "opt-141-d",
        "label": "D",
        "text": "six digits."
      }
    ],
    "correctOptionId": "opt-141-c",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "In frogs (Rana tigrina), the forelimbs end in four digits (no web), whereas hindlimbs end in five webbed digits adapted for swimming.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q142",
    "questionNumber": 142,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals (Muscle Types)",
    "text": "Consider the three types of muscle tissues: Skeletal, Smooth, and Cardiac. Which of the following statements correctly differentiates them?",
    "options": [
      {
        "id": "opt-142-a",
        "label": "A",
        "text": "Skeletal muscle is involuntary and non-striated, while smooth muscle is voluntary and striated."
      },
      {
        "id": "opt-142-b",
        "label": "B",
        "text": "Cardiac muscle cells are branched, striated, and possess intercalated discs for rapid signal transmission."
      },
      {
        "id": "opt-142-c",
        "label": "C",
        "text": "Smooth muscle is found in the walls of internal organs and is characterised by multiple peripheral nuclei."
      },
      {
        "id": "opt-142-d",
        "label": "D",
        "text": "Skeletal muscle is not attached to bones, providing internal organ movements."
      }
    ],
    "correctOptionId": "opt-142-b",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "Cardiac muscle cells are uninucleate, branched, striated, and contain intercalated discs for electrical coupling.",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q143",
    "questionNumber": 143,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 143: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-143-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-143-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-143-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-143-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-143-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q144",
    "questionNumber": 144,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 144: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-144-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-144-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-144-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-144-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-144-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 18,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q145",
    "questionNumber": 145,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 145: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-145-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-145-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-145-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-145-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-145-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q146",
    "questionNumber": 146,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 146: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-146-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-146-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-146-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-146-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-146-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q147",
    "questionNumber": 147,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 147: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-147-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-147-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-147-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-147-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-147-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q148",
    "questionNumber": 148,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 148: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-148-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-148-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-148-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-148-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-148-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q149",
    "questionNumber": 149,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 149: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-149-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-149-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-149-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-149-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-149-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q150",
    "questionNumber": 150,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 150: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-150-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-150-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-150-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-150-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-150-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q151",
    "questionNumber": 151,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 151: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-151-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-151-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-151-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-151-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-151-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q152",
    "questionNumber": 152,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 152: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-152-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-152-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-152-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-152-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-152-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 19,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q153",
    "questionNumber": 153,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 153: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-153-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-153-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-153-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-153-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-153-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q154",
    "questionNumber": 154,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 154: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-154-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-154-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-154-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-154-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-154-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q155",
    "questionNumber": 155,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 155: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-155-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-155-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-155-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-155-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-155-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q156",
    "questionNumber": 156,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 156: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-156-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-156-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-156-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-156-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-156-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q157",
    "questionNumber": 157,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 157: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-157-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-157-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-157-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-157-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-157-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q158",
    "questionNumber": 158,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 158: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-158-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-158-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-158-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-158-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-158-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q159",
    "questionNumber": 159,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 159: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-159-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-159-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-159-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-159-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-159-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q160",
    "questionNumber": 160,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 160: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-160-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-160-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-160-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-160-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-160-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 20,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q161",
    "questionNumber": 161,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 161: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-161-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-161-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-161-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-161-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-161-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q162",
    "questionNumber": 162,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 162: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-162-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-162-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-162-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-162-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-162-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q163",
    "questionNumber": 163,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 163: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-163-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-163-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-163-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-163-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-163-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q164",
    "questionNumber": 164,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 164: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-164-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-164-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-164-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-164-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-164-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q165",
    "questionNumber": 165,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 165: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-165-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-165-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-165-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-165-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-165-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q166",
    "questionNumber": 166,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 166: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-166-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-166-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-166-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-166-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-166-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q167",
    "questionNumber": 167,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 167: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-167-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-167-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-167-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-167-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-167-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q168",
    "questionNumber": 168,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 168: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-168-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-168-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-168-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-168-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-168-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 21,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q169",
    "questionNumber": 169,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 169: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-169-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-169-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-169-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-169-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-169-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q170",
    "questionNumber": 170,
    "subject": "Zoology",
    "section": "Section A",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 170: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-170-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-170-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-170-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-170-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-170-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q171",
    "questionNumber": 171,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 171: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-171-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-171-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-171-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-171-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-171-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q172",
    "questionNumber": 172,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 172: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-172-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-172-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-172-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-172-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-172-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q173",
    "questionNumber": 173,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 173: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-173-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-173-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-173-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-173-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-173-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q174",
    "questionNumber": 174,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 174: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-174-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-174-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-174-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-174-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-174-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q175",
    "questionNumber": 175,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 175: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-175-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-175-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-175-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-175-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-175-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q176",
    "questionNumber": 176,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 176: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-176-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-176-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-176-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-176-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-176-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 22,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q177",
    "questionNumber": 177,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 177: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-177-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-177-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-177-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-177-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-177-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 23,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q178",
    "questionNumber": 178,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 178: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-178-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-178-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-178-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-178-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-178-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "medium",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 23,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q179",
    "questionNumber": 179,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 179: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-179-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-179-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-179-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-179-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-179-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "easy",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 23,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  },
  {
    "id": "yakeen-pt02-q180",
    "questionNumber": 180,
    "subject": "Zoology",
    "section": "Section B",
    "topic": "Structural Organisation in Animals & Morphology of Frog",
    "text": "Question 180: Regarding animal tissues (epithelial, connective, muscular, neural) and anatomical systems of Rana tigrina (frog):",
    "options": [
      {
        "id": "opt-180-a",
        "label": "A",
        "text": "Option 1 is correct"
      },
      {
        "id": "opt-180-b",
        "label": "B",
        "text": "Option 2 is correct"
      },
      {
        "id": "opt-180-c",
        "label": "C",
        "text": "Option 3 is correct"
      },
      {
        "id": "opt-180-d",
        "label": "D",
        "text": "Option 4 is verified as per NCERT"
      }
    ],
    "correctOptionId": "opt-180-d",
    "marks": 4,
    "negativeMarks": 1,
    "difficulty": "hard",
    "explanation": "NCERT Class 11 Biology Chapter 7 (Structural Organisation in Animals).",
    "sourcePage": 23,
    "isAiExtracted": true,
    "reviewedByAdmin": true
  }
];

export const YAKEEN_NEET_2027_PRACTICE_TEST_02_QUESTIONS: Question[] = RAW_QUESTIONS.map((q) => ({
  ...q,
  ncertReference: q.ncertReference || resolveNCERTReference(q.text, q.subject, q.topic)
}));
