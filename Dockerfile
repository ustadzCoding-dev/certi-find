FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN cd backend && npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start backend
CMD ["node", "backend/server.js"]
