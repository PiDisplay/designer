# Build Stage
FROM node:12-buster-slim AS builder

# Create app directory
WORKDIR /app

# Copy 'yarn.lock' and 'package.json'
COPY yarn.lock package.json ./

# Install dependencies
RUN yarn install --production

# Copy project files and folders to the current working directory (i.e. '/app')
COPY . .

# Final image
FROM node:12-buster-slim AS final

# Copy built code from build stage to '/app' directory
COPY --from=builder /app /app

# Change directory to '/app' 
WORKDIR /app

EXPOSE 3010
CMD [ "yarn", "start" ]
