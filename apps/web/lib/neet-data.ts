import { Question, TestConfig } from "./types";
import { YAKEEN_CHEMISTRY_DPP1_QUESTIONS } from "./pdf-parser";
import { YAKEEN_NEET_2027_PRACTICE_TEST_01_QUESTIONS } from "./yakeen-test01-data";

export const SAMPLE_NEET_QUESTIONS: Question[] = [
  // ─── ZOOLOGY & HUMAN PHYSIOLOGY ───
  {
    id: "q-zoo-001",
    questionNumber: 1,
    subject: "Zoology",
    section: "Section A",
    topic: "Body Fluids and Circulation",
    subtopic: "Human Cardiac Cycle and Anatomy",
    text: "Refer to the anatomical cross-section diagram of the human heart provided below. Identify the chamber labeled as 'B' and select the correct functional statement regarding its physiological role during the cardiac cycle:",
    diagramUrl: "/images/heart-diagram.jpg",
    options: [
      {
        id: "opt-1a",
        label: "A",
        text: "Chamber B is the Left Ventricle; it pumps oxygenated blood into the systemic aorta under high systolic pressure (120 mmHg)."
      },
      {
        id: "opt-1b",
        label: "B",
        text: "Chamber B is the Right Ventricle; it pumps deoxygenated blood into the pulmonary trunk through the semilunar valves."
      },
      {
        id: "opt-1c",
        label: "C",
        text: "Chamber B is the Right Atrium; it receives deoxygenated blood from the superior and inferior vena cava via the tricuspid valve."
      },
      {
        id: "opt-1d",
        label: "D",
        text: "Chamber B is the Interventricular Septum; it prevents mixing of oxygenated blood from the left side with venous return."
      }
    ],
    correctOptionId: "opt-1b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "medium",
    explanation:
      "Chamber B indicates the Right Ventricle (RV). The RV has thinner myocardium compared to the Left Ventricle (D) and receives deoxygenated venous blood from the Right Atrium (A) through the tricuspid valve. During ventricular systole, it pumps deoxygenated blood into the pulmonary artery via the pulmonary semilunar valve to reach the lungs for oxygenation.",
    clinicalNote:
      "Clinical Correlation: Right Ventricular hypertrophy (Cor Pulmonale) can develop secondarily to chronic pulmonary hypertension or COPD due to increased vascular resistance.",
    sourcePage: 14
  },
  {
    id: "q-zoo-002",
    questionNumber: 2,
    subject: "Zoology",
    section: "Section A",
    topic: "Neural Control and Coordination",
    subtopic: "Conduction of Nerve Impulses",
    text: "During the transmission of a nerve impulse across a myelinated axon, what biochemical event directly initiates depolarization of the axonal membrane from the resting potential (-70 mV)?",
    options: [
      {
        id: "opt-2a",
        label: "A",
        text: "Rapid efflux of Potassium (K+) ions via voltage-gated potassium channels down their concentration gradient."
      },
      {
        id: "opt-2b",
        label: "B",
        text: "Rapid influx of Sodium (Na+) ions due to the opening of voltage-gated sodium channels towards +30 mV."
      },
      {
        id: "opt-2c",
        label: "C",
        text: "Active transport of 3 Na+ ions outward and 2 K+ ions inward by the ATP-dependent Na+/K+ pump."
      },
      {
        id: "opt-2d",
        label: "D",
        text: "Influx of Calcium (Ca2+) ions causing hyperpolarization of the postsynaptic dendritic membrane."
      }
    ],
    correctOptionId: "opt-2b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "easy",
    explanation:
      "When a threshold stimulus (approx. -55 mV) is applied at a site on the polarized axon membrane, voltage-gated Na+ channels open rapidly. This results in a rapid influx of Na+ into the axoplasm, reversing the polarity so the inner surface becomes positively charged (+30 mV). This reversal is termed depolarization (Action Potential).",
    clinicalNote:
      "Local anesthetics like Lidocaine act by reversibly blocking voltage-gated Na+ channels, halting action potential propagation and pain transmission.",
    sourcePage: 16
  },
  {
    id: "q-zoo-003",
    questionNumber: 3,
    subject: "Zoology",
    section: "Section B",
    topic: "Endocrine System & Hormones",
    subtopic: "Adrenal & Pituitary Axis",
    text: "Match the hormones in Column I with their respective clinical deficiency disorders in Column II:\n\nColumn I:\n(A) Growth Hormone (GH) in adults\n(B) Cortisol (Hypocortisolism)\n(C) Anti-diuretic Hormone (Vasopressin)\n(D) Insulin\n\nColumn II:\n(1) Diabetes Insipidus\n(2) Addison's Disease\n(3) Acromegaly\n(4) Diabetes Mellitus",
    options: [
      { id: "opt-3a", label: "A", text: "(A)-(3), (B)-(2), (C)-(1), (D)-(4)" },
      { id: "opt-3b", label: "B", text: "(A)-(2), (B)-(3), (C)-(4), (D)-(1)" },
      { id: "opt-3c", label: "C", text: "(A)-(3), (B)-(1), (C)-(2), (D)-(4)" },
      { id: "opt-3d", label: "D", text: "(A)-(4), (B)-(2), (C)-(1), (D)-(3)" }
    ],
    correctOptionId: "opt-3a",
    marks: 4,
    negativeMarks: 1,
    difficulty: "medium",
    explanation:
      "Correct matches:\n(A) Excess Growth Hormone in adults leads to Acromegaly (3).\n(B) Hyposecretion of adrenal corticosteroids (cortisol & aldosterone) causes Addison's disease (2).\n(C) Deficiency of ADH/Vasopressin causes failure of water reabsorption leading to Diabetes Insipidus (1).\n(D) Deficiency of Insulin causes hyperglycemia known as Diabetes Mellitus (4).",
    clinicalNote:
      "Addisonian crisis presents with acute hypotension, hyperkalemia, and hyponatremia requiring immediate IV hydrocortisone.",
    sourcePage: 18
  },

  // ─── BOTANY & PLANT PHYSIOLOGY ───
  {
    id: "q-bot-001",
    questionNumber: 4,
    subject: "Botany",
    section: "Section A",
    topic: "Photosynthesis in Higher Plants",
    subtopic: "Calvin Cycle & C4 Pathway",
    text: "In C4 plants such as Zea mays (Maize) and Sugarcane, the primary atmospheric CO2 acceptor and the primary carboxylation enzyme in the mesophyll cells are respectively:",
    options: [
      {
        id: "opt-4a",
        label: "A",
        text: "Ribulose-1,5-bisphosphate (RuBP) and RuBisCO"
      },
      {
        id: "opt-4b",
        label: "B",
        text: "Phosphoenolpyruvate (PEP) and PEP carboxylase (PEPcase)"
      },
      {
        id: "opt-4c",
        label: "C",
        text: "Oxaloacetic acid (OAA) and Malic dehydrogenase"
      },
      {
        id: "opt-4d",
        label: "D",
        text: "Phosphoglyceraldehyde (PGA) and Aldolase"
      }
    ],
    correctOptionId: "opt-4b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "easy",
    explanation:
      "In C4 plants, the primary CO2 acceptor is a 3-carbon compound Phosphoenolpyruvate (PEP) present in the mesophyll cells. The enzyme catalyzing this reaction is PEP carboxylase (PEPcase). It fixes CO2 to form a 4-carbon acid Oxaloacetic acid (OAA). RuBisCO is absent in mesophyll cells of C4 plants and is concentrated in the bundle sheath cells.",
    clinicalNote:
      "Kranz anatomy in C4 plants confers high water-use efficiency and prevents photorespiratory loss under tropical high-temperature conditions.",
    sourcePage: 22
  },
  {
    id: "q-bot-002",
    questionNumber: 5,
    subject: "Botany",
    section: "Section A",
    topic: "Genetics and Molecular Biology",
    subtopic: "Transcription and RNA Processing",
    text: "In eukaryotic pre-mRNA processing, which of the following post-transcriptional modifications protects the 5' end from exonuclease degradation and facilitates ribosome recognition during translation initiation?",
    options: [
      {
        id: "opt-5a",
        label: "A",
        text: "Polyadenylation (addition of 200-300 Adenylate residues) at 3' end"
      },
      {
        id: "opt-5b",
        label: "B",
        text: "Capping with 7-methylguanosine triphosphate (m7Gppp) at the 5' end"
      },
      {
        id: "opt-5c",
        label: "C",
        text: "Exon skipping and spliceosome-mediated intron lariat release"
      },
      {
        id: "opt-5d",
        label: "D",
        text: "DNA methylation at CpG islands by DNA methyltransferase"
      }
    ],
    correctOptionId: "opt-5b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "easy",
    explanation:
      "During capping, an unusual nucleotide 7-methylguanosine triphosphate (m7G) is added to the 5' end of hnRNA/pre-mRNA by guanylyltransferase. The 5' cap is essential for ribosome binding via eIF4E, translation initiation, and prevents cellular 5'->3' exonuclease attack.",
    clinicalNote:
      "Aberrations in mRNA capping and spliceosome machinery underlie several congenital genetic disorders, including Spinal Muscular Atrophy (SMA).",
    sourcePage: 25
  },

  // ─── PHYSICS & MEDICAL INSTRUMENTATION ───
  {
    id: "q-phy-001",
    questionNumber: 6,
    subject: "Physics",
    section: "Section A",
    topic: "Current Electricity",
    subtopic: "Wheatstone Bridge & Resistance Networks",
    text: "Given the Wheatstone Bridge circuit shown in the diagram below with resistor values R1 = 10 Ω, R3 = 20 Ω, and R4 = 40 Ω across terminals A, B, C, D:\n\nIf the galvanometer shows zero deflection (null point condition, Ig = 0), what is the exact value of the unknown resistor R2 (Rx)?",
    diagramUrl: "/images/circuit-diagram.jpg",
    options: [
      { id: "opt-6a", label: "A", text: "R2 = 20 Ω" },
      { id: "opt-6b", label: "B", text: "R2 = 10 Ω" },
      { id: "opt-6c", label: "C", text: "R2 = 5 Ω" },
      { id: "opt-6d", label: "D", text: "R2 = 80 Ω" }
    ],
    correctOptionId: "opt-6a",
    marks: 4,
    negativeMarks: 1,
    difficulty: "medium",
    explanation:
      "For a balanced Wheatstone Bridge where galvanometer current Ig = 0, the ratio of adjacent bridge arms is equal:\n\nR1 / R2 = R3 / R4\n\nRearranging for R2:\nR2 = R1 × (R4 / R3)\nR2 = 10 Ω × (40 Ω / 20 Ω)\nR2 = 10 Ω × 2 = 20 Ω.",
    clinicalNote:
      "Wheatstone bridge principles are used in medical strain-gauge transducers for invasive arterial blood pressure and pulmonary artery wedge pressure monitoring.",
    sourcePage: 32
  },
  {
    id: "q-phy-002",
    questionNumber: 7,
    subject: "Physics",
    section: "Section A",
    topic: "Ray Optics and Optical Instruments",
    subtopic: "Compound Microscope in Medical Diagnostics",
    text: "In a medical diagnostic compound microscope, the focal length of the objective lens is fo = 1.0 cm and that of the eyepiece is fe = 2.5 cm. If an object is placed at a distance of uo = 1.1 cm in front of the objective, and the final image is formed at the near point of distinct vision (D = 25 cm), what is the total magnifying power of the microscope?",
    options: [
      { id: "opt-7a", label: "A", text: "M = -110" },
      { id: "opt-7b", label: "B", text: "M = -55" },
      { id: "opt-7c", label: "C", text: "M = -220" },
      { id: "opt-7d", label: "D", text: "M = -25" }
    ],
    correctOptionId: "opt-7a",
    marks: 4,
    negativeMarks: 1,
    difficulty: "hard",
    explanation:
      "Magnification for objective:\n1/vo - 1/uo = 1/fo\n1/vo - 1/(-1.1) = 1/1.0  =>  1/vo = 1 - 10/11 = 1/11  =>  vo = +11 cm.\nLinear magnification of objective mo = - (vo / uo) = - (11 / 1.1) = -10.\n\nMagnification of eyepiece when image is at D:\nme = (1 + D / fe) = (1 + 25 / 2.5) = (1 + 10) = 11.\n\nTotal Magnifying Power M = mo × me = (-10) × 11 = -110.",
    clinicalNote:
      "Standard histological review of blood smears for malaria parasites (Plasmodium) requires total magnification of 100x to 1000x under oil immersion.",
    sourcePage: 35
  },

  // ─── CHEMISTRY (ORGANIC & INORGANIC) ───
  {
    id: "q-chem-001",
    questionNumber: 8,
    subject: "Chemistry",
    section: "Section A",
    topic: "Biomolecules & Organic Chemistry",
    subtopic: "Amino Acids & Peptide Bonds",
    text: "Which of the following amino acids contains an indole ring in its side-chain, serves as the essential biochemical precursor for the synthesis of the neurotransmitter serotonin and the hormone melatonin?",
    options: [
      { id: "opt-8a", label: "A", text: "L-Tyrosine" },
      { id: "opt-8b", label: "B", text: "L-Tryptophan" },
      { id: "opt-8c", label: "C", text: "L-Histidine" },
      { id: "opt-8d", label: "D", text: "L-Phenylalanine" }
    ],
    correctOptionId: "opt-8b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "medium",
    explanation:
      "L-Tryptophan is an essential aromatic amino acid containing an indole side chain. In the human body, it undergoes hydroxylation by tryptophan hydroxylase to 5-HTP, which is decarboxylated into Serotonin (5-hydroxytryptamine). In the pineal gland, serotonin is acetylated and methylated into Melatonin, the circadian rhythm regulator.",
    clinicalNote:
      "Carcinoid syndrome involves neuroendocrine tumor overproduction of serotonin from dietary tryptophan, causing flushing, diarrhea, and bronchospasm.",
    sourcePage: 40
  },
  {
    id: "q-chem-002",
    questionNumber: 9,
    subject: "Chemistry",
    section: "Section B",
    topic: "Chemical Kinetics & Equilibrium",
    subtopic: "First Order Reactions & Half-Life",
    text: "A radioactive isotope 131-I (Iodine-131) used in the therapeutic ablation of thyroid carcinoma has a physical half-life (t1/2) of 8.0 days. If an initial therapeutic dosage of 100 mCi is administered to a patient, what remaining activity of 131-I will be present in the patient's system after 32 days (assuming negligible biological clearance)?",
    options: [
      { id: "opt-9a", label: "A", text: "12.50 mCi" },
      { id: "opt-9b", label: "B", text: "6.25 mCi" },
      { id: "opt-9c", label: "C", text: "3.125 mCi" },
      { id: "opt-9d", label: "D", text: "25.00 mCi" }
    ],
    correctOptionId: "opt-9b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "easy",
    explanation:
      "Number of half-lives n = Total time (t) / Half-life (t1/2)\nn = 32 days / 8 days = 4 half-lives.\n\nRemaining activity N = N0 × (1/2)^n\nN = 100 mCi × (1/2)^4 = 100 / 16 = 6.25 mCi.",
    clinicalNote:
      "Radioiodine therapy specifically targets thyroid follicular cells due to active uptake via Sodium-Iodide Symporter (NIS) proteins.",
    sourcePage: 42
  },
  {
    id: "q-chem-003",
    questionNumber: 10,
    subject: "Chemistry",
    section: "Section A",
    topic: "Coordination Compounds",
    subtopic: "Ligands & Chelation in Medicine",
    text: "Which hexadentate chelating ligand is widely utilized in clinical medicine for intravenous emergency antidote therapy in severe acute lead (Pb2+) poisoning?",
    options: [
      { id: "opt-10a", label: "A", text: "Ethylenediamine (en)" },
      { id: "opt-10b", label: "B", text: "Ethylenediaminetetraacetate ion (EDTA4- / CaNa2EDTA)" },
      { id: "opt-10c", label: "C", text: "Dimethylglyoxime (DMG)" },
      { id: "opt-10d", label: "D", text: "Oxalate ion (ox2-)" }
    ],
    correctOptionId: "opt-10b",
    marks: 4,
    negativeMarks: 1,
    difficulty: "easy",
    explanation:
      "EDTA4- (Ethylenediaminetetraacetate) is a hexadentate ligand with 2 nitrogen and 4 oxygen donor atoms. It forms extremely stable octahedral chelate complexes with heavy metal divalent cations like Pb2+ and Hg2+, allowing safe renal excretion.",
    clinicalNote:
      "Calcium disodium EDTA (CaNa2EDTA) is preferred over Na2EDTA to prevent severe hypocalcemic tetany and cardiac arrest.",
    sourcePage: 45
  }
];

export const DEFAULT_TESTS: TestConfig[] = [
  {
    id: "test-neet-grand-01",
    title: "All-India NEET Mock Test 2025 (Full Syllabus — NTA Pattern)",
    code: "NEET-GT-2025-01",
    description:
      "Authentic NTA NEET pattern mock test covering Physics, Chemistry, Botany, and Zoology with detailed clinical solutions, negative marking (+4 / -1), and real-time percentile ranking.",
    instructions: [
      "Total examination duration is 200 minutes (3 hours 20 minutes) for 200 questions (Attempt 180 as per NTA scheme).",
      "Marking Scheme: +4 marks for every correct answer, -1 mark deducted for every incorrect response, 0 marks for unattempted questions.",
      "The test is divided into 4 subjects: Physics, Chemistry, Botany, and Zoology.",
      "Each subject contains Section A (Mandatory questions) and Section B (Choice-based questions).",
      "Do not refresh or close the browser window during the active test session.",
      "The test will automatically submit upon countdown timer expiration."
    ],
    totalQuestions: SAMPLE_NEET_QUESTIONS.length,
    totalMarks: SAMPLE_NEET_QUESTIONS.length * 4,
    durationMinutes: 200,
    positiveMarks: 4,
    negativeMarks: 1,
    passingMarks: 480,
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
    pattern: "NTA_NEET_2025",
    status: "published",
    createdAt: "2026-08-20T10:00:00Z",
    questions: SAMPLE_NEET_QUESTIONS
  },
  {
    id: "test-human-physio-02",
    title: "NEET High-Yield: Human Physiology & Clinical Cardiology",
    code: "NEET-UNIT-BIO-02",
    description:
      "Specialized high-yield unit test focusing on Cardiac cycle, ECG interpretation, Neural impulse transmission, and Endocrine feedback loops.",
    instructions: [
      "Duration: 45 minutes.",
      "Marking scheme: +4 / -1 / 0.",
      "Diagram-based clinical questions included."
    ],
    totalQuestions: 5,
    totalMarks: 20,
    durationMinutes: 45,
    positiveMarks: 4,
    negativeMarks: 1,
    passingMarks: 16,
    subjects: ["Zoology"],
    pattern: "UNIT_TEST",
    status: "published",
    createdAt: "2026-08-22T14:30:00Z",
    questions: SAMPLE_NEET_QUESTIONS.filter((q) => q.subject === "Zoology")
  },
  {
    id: "test-physics-circuits-03",
    title: "NEET Physics Rapid Sprint: Current Electricity & Optics",
    code: "NEET-UNIT-PHY-03",
    description:
      "Rigorous problem sets covering Wheatstone bridges, Kirchhoff's laws, potentiometer sensitivity, and optical microscope magnification.",
    instructions: [
      "Duration: 30 minutes.",
      "Marking scheme: +4 / -1 / 0.",
      "Calculators are strictly prohibited."
    ],
    totalQuestions: 2,
    totalMarks: 8,
    durationMinutes: 30,
    positiveMarks: 4,
    negativeMarks: 1,
    passingMarks: 8,
    subjects: ["Physics"],
    pattern: "UNIT_TEST",
    status: "published",
    createdAt: "2026-08-23T09:15:00Z",
    questions: SAMPLE_NEET_QUESTIONS.filter((q) => q.subject === "Physics")
  },
  {
    id: "test-yakeen-chem-dpp01",
    title: "Yakeen 2.0 2027 — Physical Chemistry (DPP 01: Some Basic Concepts of Chemistry)",
    code: "YAKEEN-CHEM-DPP01",
    description:
      "Daily Practice Problem (DPP 1) by Sudhanshu Kumar Sir. Covers classification of matter, atomic structure, isotopic notation, gas laws, and subatomic particle ratio calculations.",
    instructions: [
      "Total questions: 23. Attempt all questions.",
      "Marking scheme: +4 for correct responses, -1 for incorrect responses, 0 for unattempted.",
      "Calculators and periodic tables are strictly prohibited.",
      "Standard NTA NEET pattern unit test."
    ],
    totalQuestions: 23,
    totalMarks: 92,
    durationMinutes: 45,
    positiveMarks: 4,
    negativeMarks: 1,
    passingMarks: 40,
    subjects: ["Chemistry"],
    pattern: "UNIT_TEST",
    status: "published",
    createdAt: "2026-08-24T04:00:00Z",
    questions: YAKEEN_CHEMISTRY_DPP1_QUESTIONS
  },
  {
    id: "test-yakeen-neet-2027-pt01",
    title: "Yakeen NEET 2.0 (2027) — Practice Test 01 (Full Syllabus: 180 Questions)",
    code: "YAKEEN-NEET-2027-PT01",
    description:
      "Official 180-question mock test booklet (720 Marks, 180 Minutes). Covers Physics (Basic Maths & Calculus), Chemistry (Some Basic Concepts of Chemistry), Botany (Cell - The Unit of Life), and Zoology (Structural Organisation in Animals).",
    instructions: [
      "Total duration: 180 minutes for 180 questions (45 questions in each subject).",
      "Total Maximum Marks: 720.",
      "Marking Scheme: +4 marks for each correct response, -1 mark deducted for incorrect response, 0 marks for unattempted.",
      "Subject Distribution: Physics (Q1-45), Chemistry (Q46-90), Botany (Q91-135), Zoology (Q136-180).",
      "Each subject has Section A (35 questions) and Section B (10 questions).",
      "Calculators, mobile devices, and tables are strictly prohibited."
    ],
    totalQuestions: 180,
    totalMarks: 720,
    durationMinutes: 180,
    positiveMarks: 4,
    negativeMarks: 1,
    passingMarks: 360,
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
    pattern: "NTA_NEET_2025",
    status: "published",
    createdAt: "2026-08-24T12:00:00Z",
    questions: YAKEEN_NEET_2027_PRACTICE_TEST_01_QUESTIONS
  }
];
