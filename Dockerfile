FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy application code
WORKDIR /app
COPY . .

# Expose port
EXPOSE 5000

# Start backend
CMD ["node", "backend/server.js"]
