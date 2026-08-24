"""
Love NEET Workers Orchestrator (WAT Architecture)
Coordinates deterministic extraction tools and AI question structuring pipelines.
"""

import sys
import json
from app.extract_pdf import extract_pdf_structure
from app.extract_images import extract_diagrams_from_pdf


def run_pipeline(pdf_path: str) -> None:
    print(f"[WORKER] Starting extraction pipeline for: {pdf_path}")

    # 1. Structure extraction
    pdf_info = extract_pdf_structure(pdf_path)
    print(f"[WORKER] Extracted {pdf_info.get('totalPages', 0)} pages.")

    # 2. Diagram extraction
    diagrams_info = extract_diagrams_from_pdf(pdf_path)
    print(f"[WORKER] Extracted {diagrams_info.get('totalDiagramsExtracted', 0)} clinical diagrams.")

    print("[WORKER] PDF processing completed successfully.")


def main() -> None:
    if len(sys.argv) > 1:
        run_pipeline(sys.argv[1])
    else:
        print("Love NEET worker foundation scaffold ready. Pass PDF path to process.")


if __name__ == "__main__":
    main()
