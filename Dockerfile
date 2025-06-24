# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.52.0-jammy 

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the code (tests, config, etc.)
COPY . .

# Run tests by default
CMD ["sh", "-c", "npx playwright test $PLAYWRIGHT_ARGS"]

