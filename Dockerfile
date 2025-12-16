FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies in backend directory
WORKDIR /app/backend
RUN npm install

# Copy application code back to app root
WORKDIR /app
COPY . .

# Copy start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 5000

# Start backend
ENTRYPOINT ["/app/start.sh"]
