FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy application code
COPY . .

# Copy start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 5000

# Start backend
ENTRYPOINT ["/app/start.sh"]
