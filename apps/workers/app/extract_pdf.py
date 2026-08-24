"""
WAT Tool: extract_pdf.py
Robust Python PDF Text & MCQ Extractor utilizing pypdf with full ToUnicode CMap decoding
and explicit UTF-8 stdio configuration for Windows.
"""

import sys
import json
import os
import re
import unicodedata
from typing import Dict, Any, List

# Force UTF-8 on Windows command line
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')


def clean_text(text: str) -> str:
    """Normalizes Unicode ligatures and removes non-printable control characters."""
    if not text:
        return ""
    # Normalize ligatures like fi (\ufb01), fl (\ufb02), etc.
    text = unicodedata.normalize('NFKD', text)
    # Remove control characters except \n, \r, \t
    cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', text)
    # Normalize whitespace
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
    return cleaned.strip()


def extract_pdf_with_pypdf(pdf_path: str) -> Dict[str, Any]:
    if not os.path.exists(pdf_path):
        return {
            "success": False,
            "error": f"File not found: {pdf_path}",
            "text": "",
            "pages": []
        }

    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        total_pages = len(reader.pages)
        full_text_list: List[str] = []
        page_items: List[Dict[str, Any]] = []

        for idx, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            cleaned_page = clean_text(page_text)
            if cleaned_page:
                full_text_list.append(cleaned_page)
                page_items.append({
                    "pageNumber": idx + 1,
                    "text": cleaned_page,
                    "charCount": len(cleaned_page)
                })

        extracted_full_text = "\n\n".join(full_text_list)

        return {
            "success": True,
            "filename": os.path.basename(pdf_path),
            "totalPages": total_pages,
            "text": extracted_full_text,
            "pages": page_items
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "text": "",
            "pages": []
        }


def parse_questions_from_text(raw_text: str, filename: str) -> List[Dict[str, Any]]:
    if not raw_text or len(raw_text.strip()) < 20:
        return []

    cleaned_raw = clean_text(raw_text)
    questions: List[Dict[str, Any]] = []

    # Regex for question numbers (e.g. "Q1", "Q.1", "1.", "1)", "Question 1")
    q_pattern = re.compile(r'(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*)?(\d{1,3})[\.\)\:\-]\s+', re.IGNORECASE)
    matches = list(q_pattern.finditer(cleaned_raw))

    if not matches:
        paragraphs = [p.strip() for p in re.split(r'\n\s*\n', cleaned_raw) if len(p.strip()) > 30]
        for idx, p in enumerate(paragraphs):
            q = parse_single_block(p, idx + 1, filename)
            if q:
                questions.append(q)
        return questions

    for i in range(len(matches)):
        start = matches[i].end()
        end = matches[i + 1].start() if i < len(matches) - 1 else len(cleaned_raw)
        block = cleaned_raw[start:end].strip()
        q_num = int(matches[i].group(1))

        parsed = parse_single_block(block, q_num, filename)
        if parsed:
            questions.append(parsed)

    return questions


def parse_single_block(block: str, q_num: int, filename: str = "") -> Dict[str, Any]:
    opt_pattern = re.compile(
        r'(?:[\(\[\s]|^)([A-Da-d1-4])[\.\)\:\-]\s+([\s\S]*?)(?=(?:[\(\[\s]|^)[A-Da-d1-4][\.\)\:\-]\s+|$)'
    )

    opt_matches = list(opt_pattern.finditer(block))
    raw_options: List[Dict[str, str]] = []
    first_opt_idx = -1

    for m in opt_matches:
        if first_opt_idx == -1:
            first_opt_idx = m.start()
        lbl = m.group(1).upper()
        if lbl == "1": lbl = "A"
        elif lbl == "2": lbl = "B"
        elif lbl == "3": lbl = "C"
        elif lbl == "4": lbl = "D"

        opt_text = m.group(2).strip()
        opt_text = re.sub(r'\r?\n?(?:Ans(?:wer)?|Key|Correct)[:\s\-\)]+[A-Da-d1-4][\s\S]*$', '', opt_text, flags=re.IGNORECASE).strip()
        raw_options.append({"label": lbl, "text": opt_text})

    if first_opt_idx > 0:
        q_text = block[:first_opt_idx].strip()
    elif not raw_options:
        q_text = block.strip()
    else:
        q_text = block.split('\n')[0].strip()

    q_text = clean_text(q_text)
    if len(q_text) < 10:
        q_text = f"Question #{q_num} from {filename}:\n{block[:180]}"

    final_options: List[Dict[str, Any]] = []
    if len(raw_options) >= 2:
        for o in raw_options[:4]:
            final_options.append({
                "id": f"opt-{q_num}-{o['label'].lower()}",
                "label": o['label'],
                "text": o['text'] or f"Option {o['label']}"
            })
    else:
        final_options = [
            {"id": f"opt-{q_num}-a", "label": "A", "text": "Option A"},
            {"id": f"opt-{q_num}-b", "label": "B", "text": "Option B"},
            {"id": f"opt-{q_num}-c", "label": "C", "text": "Option C"},
            {"id": f"opt-{q_num}-d", "label": "D", "text": "Option D"}
        ]

    lower = (q_text + " " + block).lower()
    subject = "Chemistry"
    if any(k in lower for k in ["plant", "chloroplast", "botany", "rubisco", "xylem", "leaf", "flower"]):
        subject = "Botany"
    elif any(k in lower for k in ["resistor", "current", "lens", "velocity", "physics", "circuit", "flux", "acceleration"]):
        subject = "Physics"
    elif any(k in lower for k in ["reaction", "acid", "compound", "mole", "equilibrium", "chemistry", "gas", "liquid", "solid", "atom", "electron", "proton"]):
        subject = "Chemistry"
    elif any(k in lower for k in ["heart", "blood", "hormone", "kidney", "neuron", "cell", "dna", "zoology"]):
        subject = "Zoology"

    diagram_url = None
    if any(k in lower for k in ["diagram", "figure", "shown below", "circuit"]):
        if subject == "Zoology": diagram_url = "/images/heart-diagram.jpg"
        elif subject == "Physics": diagram_url = "/images/circuit-diagram.jpg"

    correct_id = final_options[0]["id"]
    ans_match = re.search(r'(?:Ans(?:wer)?|Key|Correct)[:\s\-\)]+([A-Da-d1-4])', block, re.IGNORECASE)
    if ans_match:
        ans_lbl = ans_match.group(1).upper()
        if ans_lbl == "1": ans_lbl = "A"
        elif ans_lbl == "2": ans_lbl = "B"
        elif ans_lbl == "3": ans_lbl = "C"
        elif ans_lbl == "4": ans_lbl = "D"
        for opt in final_options:
            if opt["label"] == ans_lbl:
                correct_id = opt["id"]
                break

    return {
        "id": f"pdf-q-{q_num}-{os.path.splitext(filename)[0][:10]}",
        "questionNumber": q_num,
        "subject": subject,
        "section": "Section A" if q_num <= 35 else "Section B",
        "topic": f"{subject} Foundation",
        "text": q_text,
        "diagramUrl": diagram_url,
        "options": final_options,
        "correctOptionId": correct_id,
        "marks": 4,
        "negativeMarks": 1,
        "difficulty": "medium",
        "explanation": f"Extracted from {filename}.",
        "clinicalNote": "NCERT reference flagged for verification.",
        "sourcePage": max(1, (q_num + 10) // 11),
        "isAiExtracted": True,
        "reviewedByAdmin": False
    }


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python extract_pdf.py <pdf_path>"}, ensure_ascii=False))
        sys.exit(1)

    pdf_path = sys.argv[1]
    res = extract_pdf_with_pypdf(pdf_path)
    
    if res.get("success") and res.get("text"):
        questions = parse_questions_from_text(res["text"], os.path.basename(pdf_path))
        res["questions"] = questions
        res["questionsCount"] = len(questions)
    else:
        res["questions"] = []
        res["questionsCount"] = 0

    print(json.dumps(res, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
