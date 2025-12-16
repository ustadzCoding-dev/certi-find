FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start backend using shell form
CMD sh -c "node /app/backend/server.js"
