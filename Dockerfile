ARG NODE_VERSION=22.3
ARG ALPINE_VERSION=3.20

# ----------------------------
# Install dependencies + build
# ----------------------------
FROM oven/bun:alpine as builder
WORKDIR /workspace-builder

# Copy necessary files
COPY . .

# Install dependencies
RUN bun install

# Build all applications using Turbo
ARG _ENV
ARG _REPO
ARG _ASSET_TAG
ARG _DEPLOYED_LOCATION
ARG _COMMIT_SHA

ENV _ENV ${_ENV}
ENV _REPO ${_REPO}
ENV _ASSET_TAG ${_ASSET_TAG}
ENV _DEPLOYED_LOCATION ${_DEPLOYED_LOCATION}
ENV _COMMIT_SHA ${_COMMIT_SHA}

# WHEREISTOPPED: add missing env to dockerfile, turbo config(optional, test), and next.config.js.

ENV IS_DOCKER yes
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run buildall

# Organize build artifacts into a common directory
# standalone is built by next, to be run by node in the next stage
# static_assets is created separately, to be copied by to the CDN by cloudbuild
RUN mkdir -p /workspace-builder/build       /workspace-builder/static_assets

RUN for dir in /workspace-builder/apps/*; do \
        app=$(basename $dir); \
        if [ -d "$dir/.next/standalone" ]; then \
            mkdir -p /workspace-builder/build/$app/.next/static; \
            cp    -r $dir/.next/standalone/*   /workspace-builder/build/$app/; \
            fi; \
            if [ -d "$dir/.next/static" ]; then \
            mkdir -p /workspace-builder/static_assets/$app/_next/_static/_next/static; \
            cp    -r $dir/.next/static/*       /workspace-builder/static_assets/$app/_next/_static/_next/static/; \
        fi; \
    done

# Remove unnecessary files
RUN rm -rf node_modules

RUN ls -l

# ----------------------
# Build production image
# ----------------------
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as runner
WORKDIR /workspace-runner

ARG _ENV
ARG _DEPLOYED_LOCATION

ENV NODE_ENV production
ENV IS_DOCKER yes
ENV _ENV ${_ENV}
ENV _DEPLOYED_LOCATION ${_DEPLOYED_LOCATION}
ENV PORT 8080

# Copy built assets from builder stage
COPY --from=builder /workspace-builder/build            /workspace-runner/
COPY --from=builder /workspace-builder/static_assets    /workspace-runner/static_assets

# Expose the port the app will run on
EXPOSE 8080

# Set the entry point to start the specified app using Node.js
CMD ["sh", "-c", "HOSTNAME=\"0.0.0.0\" node ${_APP}/apps/${_APP}/server.js"]
