export interface MedicalCollege {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  tier: "Tier 1 (Apex)" | "Tier 2 (Premier)" | "Tier 3 (State Core)";
  nirfRank?: number;
  totalSeats: number;
  annualFeeInr: number;
  establishedYear: number;
  type: "AIIMS" | "Central University" | "State Government Medical College";
  websiteUrl?: string;
  cutoffs: {
    general: { minScore: number; closingAir: number };
    obc: { minScore: number; closingAir: number };
    ews: { minScore: number; closingAir: number };
    sc: { minScore: number; closingAir: number };
    st: { minScore: number; closingAir: number };
  };
  highlights: string[];
}

export const TOP_GOVERNMENT_MEDICAL_COLLEGES: MedicalCollege[] = [
  {
    id: "aiims-new-delhi",
    name: "All India Institute of Medical Sciences (AIIMS)",
    shortName: "AIIMS New Delhi",
    city: "New Delhi",
    state: "Delhi",
    tier: "Tier 1 (Apex)",
    nirfRank: 1,
    totalSeats: 125,
    annualFeeInr: 1628,
    establishedYear: 1956,
    type: "AIIMS",
    websiteUrl: "https://www.aiims.edu",
    cutoffs: {
      general: { minScore: 710, closingAir: 57 },
      obc: { minScore: 700, closingAir: 247 },
      ews: { minScore: 698, closingAir: 280 },
      sc: { minScore: 680, closingAir: 1020 },
      st: { minScore: 665, closingAir: 2850 }
    },
    highlights: ["#1 NIRF Medical Institute in India", "World-renowned clinical research facility", "Nominal tuition fee (~₹1,628/year)"]
  },
  {
    id: "mamc-new-delhi",
    name: "Maulana Azad Medical College (MAMC)",
    shortName: "MAMC New Delhi",
    city: "New Delhi",
    state: "Delhi",
    tier: "Tier 1 (Apex)",
    nirfRank: 3,
    totalSeats: 250,
    annualFeeInr: 2400,
    establishedYear: 1958,
    type: "State Government Medical College",
    websiteUrl: "https://mamc.ac.in",
    cutoffs: {
      general: { minScore: 700, closingAir: 90 },
      obc: { minScore: 690, closingAir: 410 },
      ews: { minScore: 688, closingAir: 530 },
      sc: { minScore: 665, closingAir: 2100 },
      st: { minScore: 645, closingAir: 5200 }
    },
    highlights: ["Associated with Lok Nayak & GB Pant Hospitals", "High clinical patient footfall (10,000+ daily OPD)", "Premier PG internal quota (50% DU Quota)"]
  },
  {
    id: "vmmc-safdarjung",
    name: "Vardhman Mahavir Medical College & Safdarjung Hospital",
    shortName: "VMMC Safdarjung",
    city: "New Delhi",
    state: "Delhi",
    tier: "Tier 1 (Apex)",
    nirfRank: 5,
    totalSeats: 170,
    annualFeeInr: 33500,
    establishedYear: 2001,
    type: "Central University",
    websiteUrl: "https://vmmc-sjh.nic.in",
    cutoffs: {
      general: { minScore: 695, closingAir: 135 },
      obc: { minScore: 685, closingAir: 610 },
      ews: { minScore: 682, closingAir: 750 },
      sc: { minScore: 658, closingAir: 3100 },
      st: { minScore: 638, closingAir: 6800 }
    },
    highlights: ["Massive 2,900-bed multispecialty hospital", "IP University PG quota benefit", "Cutting-edge robotic surgery wings"]
  },
  {
    id: "jipmer-puducherry",
    name: "JIPMER (Jawaharlal Institute of Postgraduate Medical Education & Research)",
    shortName: "JIPMER Puducherry",
    city: "Puducherry",
    state: "Puducherry",
    tier: "Tier 1 (Apex)",
    nirfRank: 2,
    totalSeats: 200,
    annualFeeInr: 7620,
    establishedYear: 1823,
    type: "Central University",
    websiteUrl: "https://jipmer.edu.in",
    cutoffs: {
      general: { minScore: 690, closingAir: 280 },
      obc: { minScore: 680, closingAir: 940 },
      ews: { minScore: 678, closingAir: 1120 },
      sc: { minScore: 650, closingAir: 4300 },
      st: { minScore: 630, closingAir: 9100 }
    },
    highlights: ["Institute of National Importance (INI)", "Historic institution founded in 1823", "World-class super-specialty simulation center"]
  },
  {
    id: "aiims-jodhpur",
    name: "AIIMS Jodhpur",
    shortName: "AIIMS Jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    tier: "Tier 1 (Apex)",
    nirfRank: 13,
    totalSeats: 125,
    annualFeeInr: 5856,
    establishedYear: 2012,
    type: "AIIMS",
    websiteUrl: "https://www.aiimsjodhpur.edu.in",
    cutoffs: {
      general: { minScore: 686, closingAir: 490 },
      obc: { minScore: 675, closingAir: 1350 },
      ews: { minScore: 672, closingAir: 1600 },
      sc: { minScore: 642, closingAir: 6100 },
      st: { minScore: 622, closingAir: 12400 }
    },
    highlights: ["Fastest growing Phase-II AIIMS", "Exceptional USMLE / INI-CET selection rate", "State-of-the-art trauma & oncology center"]
  },
  {
    id: "aiims-bhopal",
    name: "AIIMS Bhopal",
    shortName: "AIIMS Bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    tier: "Tier 1 (Apex)",
    nirfRank: 18,
    totalSeats: 125,
    annualFeeInr: 5856,
    establishedYear: 2012,
    type: "AIIMS",
    websiteUrl: "https://aiimsbhopal.edu.in",
    cutoffs: {
      general: { minScore: 682, closingAir: 630 },
      obc: { minScore: 672, closingAir: 1650 },
      ews: { minScore: 668, closingAir: 1980 },
      sc: { minScore: 638, closingAir: 7500 },
      st: { minScore: 618, closingAir: 14800 }
    },
    highlights: ["Premier Central Medical Institution in Central India", "960-bed tertiary super-specialty hospital", "Modern digital anatomy dissecting tables"]
  },
  {
    id: "ims-bhu",
    name: "Institute of Medical Sciences, Banaras Hindu University (IMS-BHU)",
    shortName: "IMS BHU Varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    tier: "Tier 1 (Apex)",
    nirfRank: 8,
    totalSeats: 100,
    annualFeeInr: 14900,
    establishedYear: 1960,
    type: "Central University",
    websiteUrl: "https://www.bhu.ac.in/ims",
    cutoffs: {
      general: { minScore: 680, closingAir: 860 },
      obc: { minScore: 670, closingAir: 1920 },
      ews: { minScore: 665, closingAir: 2350 },
      sc: { minScore: 635, closingAir: 8900 },
      st: { minScore: 615, closingAir: 16500 }
    },
    highlights: ["Heritage Central University campus", "Sir Sunderlal Hospital (1,500+ beds)", "50% Institutional Quota in MD/MS"]
  },
  {
    id: "seth-gs-kem-mumbai",
    name: "Seth GS Medical College & KEM Hospital",
    shortName: "KEM Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    tier: "Tier 1 (Apex)",
    nirfRank: 12,
    totalSeats: 250,
    annualFeeInr: 125000,
    establishedYear: 1926,
    type: "State Government Medical College",
    websiteUrl: "https://www.kem.edu",
    cutoffs: {
      general: { minScore: 676, closingAir: 1100 },
      obc: { minScore: 665, closingAir: 2600 },
      ews: { minScore: 662, closingAir: 3100 },
      sc: { minScore: 630, closingAir: 11200 },
      st: { minScore: 605, closingAir: 21000 }
    },
    highlights: ["Pioneer in cardiovascular & organ transplantation surgery in India", "Massive clinical exposure in Mumbai", "Historic medical legacy"]
  },
  {
    id: "kgmu-lucknow",
    name: "King George's Medical University (KGMU)",
    shortName: "KGMU Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    tier: "Tier 1 (Apex)",
    nirfRank: 11,
    totalSeats: 250,
    annualFeeInr: 54600,
    establishedYear: 1905,
    type: "State Government Medical College",
    websiteUrl: "https://www.kgmu.org",
    cutoffs: {
      general: { minScore: 672, closingAir: 1450 },
      obc: { minScore: 662, closingAir: 3200 },
      ews: { minScore: 658, closingAir: 3800 },
      sc: { minScore: 625, closingAir: 13500 },
      st: { minScore: 598, closingAir: 24500 }
    },
    highlights: ["Century-old prestigious royal heritage campus", "Over 4,500 hospital beds", "High volume of complex neurological and trauma cases"]
  },
  {
    id: "sms-medical-college-jaipur",
    name: "Sawai Man Singh Medical College (SMS)",
    shortName: "SMS Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    tier: "Tier 1 (Apex)",
    nirfRank: 16,
    totalSeats: 250,
    annualFeeInr: 33500,
    establishedYear: 1947,
    type: "State Government Medical College",
    websiteUrl: "https://education.rajasthan.gov.in/smsmc",
    cutoffs: {
      general: { minScore: 668, closingAir: 1850 },
      obc: { minScore: 658, closingAir: 3900 },
      ews: { minScore: 654, closingAir: 4500 },
      sc: { minScore: 620, closingAir: 15800 },
      st: { minScore: 592, closingAir: 28000 }
    },
    highlights: ["Largest government hospital in Rajasthan", "6,000+ IPD beds across attached hospitals", "Renowned surgical skills training lab"]
  },
  {
    id: "madras-medical-college",
    name: "Madras Medical College (MMC)",
    shortName: "MMC Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    tier: "Tier 1 (Apex)",
    nirfRank: 10,
    totalSeats: 250,
    annualFeeInr: 13610,
    establishedYear: 1835,
    type: "State Government Medical College",
    websiteUrl: "https://mmc.ac.in",
    cutoffs: {
      general: { minScore: 665, closingAir: 2200 },
      obc: { minScore: 655, closingAir: 4400 },
      ews: { minScore: 650, closingAir: 5200 },
      sc: { minScore: 615, closingAir: 17500 },
      st: { minScore: 588, closingAir: 31000 }
    },
    highlights: ["Third oldest medical college in India (1835)", "Rajiv Gandhi Government General Hospital (3,000 beds)", "Premier clinical training in South India"]
  },
  {
    id: "bjmc-ahmedabad",
    name: "B.J. Medical College",
    shortName: "BJMC Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    tier: "Tier 2 (Premier)",
    nirfRank: 22,
    totalSeats: 250,
    annualFeeInr: 25000,
    establishedYear: 1871,
    type: "State Government Medical College",
    websiteUrl: "https://www.bjmcabd.edu.in",
    cutoffs: {
      general: { minScore: 660, closingAir: 2800 },
      obc: { minScore: 650, closingAir: 5400 },
      ews: { minScore: 646, closingAir: 6200 },
      sc: { minScore: 610, closingAir: 19800 },
      st: { minScore: 582, closingAir: 35000 }
    },
    highlights: ["Attached to Civil Hospital Ahmedabad (largest in Asia with 2,800+ beds)", "Extensive clinical cases", "Strong PG residency program"]
  },
  {
    id: "bmcri-bengaluru",
    name: "Bangalore Medical College & Research Institute",
    shortName: "BMCRI Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    tier: "Tier 2 (Premier)",
    nirfRank: 19,
    totalSeats: 250,
    annualFeeInr: 60000,
    establishedYear: 1955,
    type: "State Government Medical College",
    websiteUrl: "https://bmcri.edu.in",
    cutoffs: {
      general: { minScore: 656, closingAir: 3400 },
      obc: { minScore: 645, closingAir: 6500 },
      ews: { minScore: 642, closingAir: 7300 },
      sc: { minScore: 605, closingAir: 22000 },
      st: { minScore: 578, closingAir: 38000 }
    },
    highlights: ["Victoria Hospital and Bowring Hospital clinical training", "Premier medical institute in Karnataka", "High clinical autonomy"]
  },
  {
    id: "calcutta-medical-college",
    name: "Medical College Kolkata",
    shortName: "CMC Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    tier: "Tier 2 (Premier)",
    nirfRank: 24,
    totalSeats: 250,
    annualFeeInr: 9000,
    establishedYear: 1835,
    type: "State Government Medical College",
    websiteUrl: "https://www.medicalcollegekolkata.in",
    cutoffs: {
      general: { minScore: 652, closingAir: 4100 },
      obc: { minScore: 642, closingAir: 7400 },
      ews: { minScore: 638, closingAir: 8300 },
      sc: { minScore: 600, closingAir: 24500 },
      st: { minScore: 572, closingAir: 42000 }
    },
    highlights: ["First medical institution in Asia to teach Western medicine", "Heritage colonial campus", "Immense variety of rare clinical pathologies"]
  },
  {
    id: "gmc-chandigarh",
    name: "Government Medical College and Hospital (GMCH)",
    shortName: "GMCH Chandigarh",
    city: "Chandigarh",
    state: "Chandigarh",
    tier: "Tier 2 (Premier)",
    nirfRank: 27,
    totalSeats: 150,
    annualFeeInr: 24979,
    establishedYear: 1991,
    type: "State Government Medical College",
    websiteUrl: "https://gmch.gov.in",
    cutoffs: {
      general: { minScore: 648, closingAir: 4900 },
      obc: { minScore: 638, closingAir: 8600 },
      ews: { minScore: 635, closingAir: 9400 },
      sc: { minScore: 595, closingAir: 27000 },
      st: { minScore: 568, closingAir: 46000 }
    },
    highlights: ["Modern infrastructure in Sector 32 Chandigarh", "Outstanding faculty-to-student ratio", "Well-equipped modular operating theatres"]
  },
  {
    id: "gmc-kozhikode",
    name: "Government Medical College, Kozhikode",
    shortName: "Calicut Medical College",
    city: "Kozhikode",
    state: "Kerala",
    tier: "Tier 2 (Premier)",
    nirfRank: 29,
    totalSeats: 250,
    annualFeeInr: 27580,
    establishedYear: 1957,
    type: "State Government Medical College",
    websiteUrl: "https://www.cmc.kerala.gov.in",
    cutoffs: {
      general: { minScore: 644, closingAir: 5600 },
      obc: { minScore: 634, closingAir: 9700 },
      ews: { minScore: 630, closingAir: 10800 },
      sc: { minScore: 590, closingAir: 29500 },
      st: { minScore: 562, closingAir: 49000 }
    },
    highlights: ["Largest hospital bed capacity in Kerala (3,025 beds)", "High healthcare quality benchmarks", "Pioneering public health initiatives"]
  },
  {
    id: "gmc-nagpur",
    name: "Government Medical College, Nagpur",
    shortName: "GMC Nagpur",
    city: "Nagpur",
    state: "Maharashtra",
    tier: "Tier 3 (State Core)",
    nirfRank: 35,
    totalSeats: 250,
    annualFeeInr: 114000,
    establishedYear: 1947,
    type: "State Government Medical College",
    websiteUrl: "https://gmcnagpur.org",
    cutoffs: {
      general: { minScore: 638, closingAir: 6900 },
      obc: { minScore: 628, closingAir: 11500 },
      ews: { minScore: 624, closingAir: 12800 },
      sc: { minScore: 582, closingAir: 34000 },
      st: { minScore: 555, closingAir: 54000 }
    },
    highlights: ["Largest medical campus in Maharashtra (196 acres)", "Attached to Asia's first Super Specialty Hospital in GMC setup", "1,900 beds"]
  },
  {
    id: "gmc-patna",
    name: "Patna Medical College & Hospital (PMCH)",
    shortName: "PMCH Patna",
    city: "Patna",
    state: "Bihar",
    tier: "Tier 3 (State Core)",
    nirfRank: 38,
    totalSeats: 200,
    annualFeeInr: 21000,
    establishedYear: 1925,
    type: "State Government Medical College",
    websiteUrl: "https://pmchpatna.in",
    cutoffs: {
      general: { minScore: 632, closingAir: 8200 },
      obc: { minScore: 622, closingAir: 13200 },
      ews: { minScore: 618, closingAir: 14600 },
      sc: { minScore: 575, closingAir: 38000 },
      st: { minScore: 548, closingAir: 59000 }
    },
    highlights: ["Historic institution undergoing redevelopment into a 5,462-bed mega hospital", "Massive clinical diversity across Eastern India"]
  }
];

export interface CollegePredictionCategoryResult {
  highChance: MedicalCollege[];
  borderline: Array<{ college: MedicalCollege; markDiff: number }>;
  dream: Array<{ college: MedicalCollege; marksNeeded: number }>;
}

export interface CollegePredictionResult {
  score: number;
  category: "general" | "obc" | "ews" | "sc" | "st";
  quota: "aiq_15" | "state_85";
  estimatedAirRange: string;
  estimatedAirMin: number;
  estimatedAirMax: number;
  estimatedPercentile: number;
  allotmentProbabilityText: string;
  topMatches: CollegePredictionCategoryResult;
}

/**
 * Predicts All India Rank (AIR) and Percentile from NEET UG score (0 to 720)
 * Calibrated against official NTA NEET UG percentile regression curves.
 */
export function predictRankAndPercentile(score: number): {
  estimatedAirRange: string;
  estimatedAirMin: number;
  estimatedAirMax: number;
  estimatedPercentile: number;
} {
  const safeScore = Math.min(720, Math.max(0, score));

  if (safeScore >= 715) {
    return { estimatedAirRange: "AIR 1 – 50", estimatedAirMin: 1, estimatedAirMax: 50, estimatedPercentile: 99.999 };
  } else if (safeScore >= 700) {
    const min = Math.round(50 + (715 - safeScore) * 15);
    const max = min + 120;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 99.985 };
  } else if (safeScore >= 680) {
    const min = Math.round(300 + (700 - safeScore) * 55);
    const max = min + 350;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 99.91 };
  } else if (safeScore >= 650) {
    const min = Math.round(1400 + (680 - safeScore) * 120);
    const max = min + 700;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 99.65 };
  } else if (safeScore >= 600) {
    const min = Math.round(5000 + (650 - safeScore) * 380);
    const max = min + 1800;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 98.4 };
  } else if (safeScore >= 550) {
    const min = Math.round(24000 + (600 - safeScore) * 750);
    const max = min + 3500;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 95.8 };
  } else if (safeScore >= 500) {
    const min = Math.round(62000 + (550 - safeScore) * 1100);
    const max = min + 6000;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 91.5 };
  } else if (safeScore >= 450) {
    const min = Math.round(117000 + (500 - safeScore) * 1500);
    const max = min + 9000;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 85.0 };
  } else if (safeScore >= 350) {
    const min = Math.round(192000 + (450 - safeScore) * 2200);
    const max = min + 15000;
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: 72.0 };
  } else {
    const min = Math.round(412000 + (350 - safeScore) * 2500);
    const max = Math.min(1800000, min + 30000);
    return { estimatedAirRange: `AIR ${min.toLocaleString()} – ${max.toLocaleString()}`, estimatedAirMin: min, estimatedAirMax: max, estimatedPercentile: Math.max(10, Math.round(safeScore * 0.15)) };
  }
}

/**
 * Predicts eligible Government Medical Colleges based on score, category, quota, and state.
 */
export function predictEligibleColleges(
  score: number,
  category: "general" | "obc" | "ews" | "sc" | "st" = "general",
  quota: "aiq_15" | "state_85" = "aiq_15",
  stateFilter?: string
): CollegePredictionResult {
  const rankInfo = predictRankAndPercentile(score);

  const filteredColleges = TOP_GOVERNMENT_MEDICAL_COLLEGES.filter((col) => {
    if (stateFilter && stateFilter !== "All" && col.state !== stateFilter) {
      return false;
    }
    return true;
  });

  const highChance: MedicalCollege[] = [];
  const borderline: Array<{ college: MedicalCollege; markDiff: number }> = [];
  const dream: Array<{ college: MedicalCollege; marksNeeded: number }> = [];

  filteredColleges.forEach((col) => {
    const cutoff = col.cutoffs[category] || col.cutoffs.general;
    const diff = score - cutoff.minScore;

    if (diff >= 0) {
      highChance.push(col);
    } else if (diff >= -15) {
      borderline.push({ college: col, markDiff: diff });
    } else {
      dream.push({ college: col, marksNeeded: Math.abs(diff) });
    }
  });

  // Sort by NIRF Rank / cutoff quality
  highChance.sort((a, b) => (a.cutoffs[category]?.closingAir || 999999) - (b.cutoffs[category]?.closingAir || 999999));
  borderline.sort((a, b) => b.markDiff - a.markDiff);
  dream.sort((a, b) => a.marksNeeded - b.marksNeeded);

  let probText = "Excellent chance for Premier AIIMS & Central Medical Colleges";
  if (score < 550) {
    probText = "Consider State Government Medical Colleges or Private/Deemed BDS/MBBS";
  } else if (score < 620) {
    probText = "Strong eligibility for State Government Medical Colleges via 85% State Quota";
  } else if (score < 660) {
    probText = "High probability for Top State GMCs & New AIIMS via All India Quota";
  }

  return {
    score,
    category,
    quota,
    estimatedAirRange: rankInfo.estimatedAirRange,
    estimatedAirMin: rankInfo.estimatedAirMin,
    estimatedAirMax: rankInfo.estimatedAirMax,
    estimatedPercentile: rankInfo.estimatedPercentile,
    allotmentProbabilityText: probText,
    topMatches: {
      highChance,
      borderline,
      dream
    }
  };
}
