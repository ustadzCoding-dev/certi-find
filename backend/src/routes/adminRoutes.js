const express = require('express');
const router = express.Router();
const {
    getStats,
    getUsers,
    toggleUserBlock,
    changeUserRole,
    seedAdmin,
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Seed admin endpoint (public, one-time only)
router.post('/seed', seedAdmin);

// All other routes require admin authentication
router.use(auth, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/block', toggleUserBlock);
router.put('/users/:id/role', changeUserRole);

module.exports = router;
