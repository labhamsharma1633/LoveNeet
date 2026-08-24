# Multi-stage Production Dockerfile for Love NEET (Next.js + Python Workers)
FROM node:20-alpine AS base
RUN apk add --no-cache python3 py3-pip libc6-compat
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json package-lock.json turbo.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/
COPY apps/workers/package.json ./apps/workers/
RUN npm ci

# Stage 2: Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Install Python requirements for PDF OCR extraction
RUN python3 -m pip install --no-cache-dir pypdf --break-system-packages

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/workers ./apps/workers

EXPOSE 3000
CMD ["npm", "start", "--workspace=@love-neet/web"]
