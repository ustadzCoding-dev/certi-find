require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

// Connect to database and sync models
sequelize.sync({ alter: process.env.NODE_ENV === 'development' }).then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🎓 CertiFind API Server                      ║
║                                                ║
║   Running on: http://localhost:${PORT}           ║
║   Environment: ${process.env.NODE_ENV || 'development'}                   ║
║   Database: SQLite                             ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);
    });
}).catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});
