# Use Node.js 16 Alpine version for a small footprint, matching the package.json engine requirement
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json headers
COPY package*.json ./

# Install dependencies cleanly and only for production
# npm ci is faster and more reliable than npm install for CI/CD/Docker environments
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
