# Build stage
FROM node:20-slim

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files (workspace-aware)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/booking-stepper-full-ui/package.json packages/booking-stepper-full-ui/

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build


# Expose the port the app runs on
EXPOSE 3000

CMD ["pnpm", "start"]
