require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🎓 CertiFind API Server                      ║
║                                                ║
║   Running on: http://localhost:${PORT}           ║
║   Environment: ${process.env.NODE_ENV || 'development'}                   ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);
    });
}).catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});
