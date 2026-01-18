# SVEC-CMS Docker Image
# Multi-stage build for optimized production image

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Configure npm for better reliability and faster downloads
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-timeout 600000 && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set progress false && \
    npm config set loglevel error

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with better caching and retry logic
# Split npm clean cache and install for better debugging
RUN --mount=type=cache,target=/root/.npm \
    npm cache clean --force || true && \
    npm ci --legacy-peer-deps --no-audit --no-fund --prefer-offline

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy environment variables (make sure .env is not in .dockerignore)
# COPY .env .env

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=true

# Build the application
RUN npm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create www-data user with matching UID/GID from host (typically 33:33 on Ubuntu/Debian)
RUN addgroup -g 33 -S www-data && \
    adduser -u 33 -S -G www-data www-data

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create uploads directory with proper permissions
RUN mkdir -p /app/public/uploads

# Set ownership to www-data
RUN chown -R www-data:www-data /app

USER www-data

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server.js"]
