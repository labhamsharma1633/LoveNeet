# Love NEET

Love NEET is a production-quality NEET test-series platform focused on reliable PDF processing, admin review workflows, and candidate assessment flows.

## Stage 1: Project Foundation

This repository is being established incrementally in line with the WAT architecture:

- Workflows define repeatable procedures
- Agent coordinates decisions and review gates
- Tools perform deterministic execution

## Architecture direction

- Frontend: Next.js + TypeScript
- Backend: API service with structured domain logic
- PDF and AI processing: Python-based job workers
- Database: PostgreSQL (source of truth)
- Queue/cache: Redis
- File storage: S3-compatible object storage
- Authentication: secure server-side auth with role-based access

## Repository structure

```text
love-neet/
├─ apps/
│  ├─ web/
│  ├─ api/
│  └─ workers/
├─ packages/
│  └─ shared/
├─ infra/
│  └─ docker/
├─ docs/
│  └─ architecture/
├─ .env.example
├─ .gitignore
├─ package.json
├─ turbo.json
└─ README.md
```

## Core product flow

```text
Admin uploads PDF
  -> PDF processing
  -> Extract text + images + structure
  -> Identify questions
  -> Review AI-generated MCQs
  -> Publish test
  -> Candidate takes test
  -> Submit answers
  -> Evaluate with negative marking
  -> Show score + analytics
```

## Safety requirements

- AI output must not be treated as authoritative without admin review.
- Score and timer logic must be enforced on the backend.
- Uploaded PDFs and extracted images must be stored in object storage, not temporary app files.

## Next steps

1. Define workspace structure and bootstrap tooling
2. Add core app and service packages
3. Add auth and database foundations
4. Add PDF-processing and AI workflow skeletons
5. Implement admin and candidate flows incrementally
