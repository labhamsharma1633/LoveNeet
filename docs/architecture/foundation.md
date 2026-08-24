# Love NEET Foundation Architecture

## Overview

This project is being structured as a production-first monorepo that separates user experience, API runtime, and specialized PDF/AI processing work.

## Core rules

- Database is authoritative for tests, scoring, and attempts.
- PDF and AI processing should be background-driven.
- Admin review is mandatory before test publication.
- Candidate timing and score must be enforced server-side.
- Object storage is used for PDF and image artifacts.

## Recommended runtime split

- Web app: Next.js frontend for admin + candidate experiences
- API service: service layer for auth, tests, attempts, scoring
- Workers: Python-based job execution for extraction and AI processing
- PostgreSQL: transactional system of record
- Redis: queue and short-lived cache coordination
- MinIO/S3: uploaded documents and extracted assets

## WAT pattern

- Workflows: upload, extraction, review, publish, submit, evaluate
- Agent: orchestrates review gates and routing
- Tools: PDF extraction, OCR, storage, scoring, AI structuring

## Stage 1 completion target

- repo structure exists
- environment baseline exists
- app, API, and worker shells exist
- database and storage runtime scaffolding is ready
- design and implementation rules remain aligned with the project specification
