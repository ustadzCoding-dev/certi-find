const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const certRoutes = require('./routes/certRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'CertiFind API is running',
        timestamp: new Date().toISOString(),
    });
});

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to CertiFind API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            certifications: '/api/certifications',
            bookmarks: '/api/bookmarks',
            admin: '/api/admin',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
    });
});

module.exports = app;
