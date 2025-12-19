const express = require('express');
const router = express.Router();
const {
    getStats,
    getUsers,
    toggleUserBlock,
    changeUserRole,
    seedAdmin,
    promoteToAdmin,
    resetPassword,
} = require('../controllers/adminController');

// Temporary route to promote a user
router.post('/promote', promoteToAdmin);

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Seed admin endpoint (public, one-time only)
router.post('/seed', seedAdmin);

// Promote user to admin endpoint (public, one-time only)
router.post('/promote', promoteToAdmin);

// Reset password endpoint (public, one-time only)
router.post('/reset-password', resetPassword);

// All other routes require admin authentication
router.use(auth, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/block', toggleUserBlock);
router.put('/users/:id/role', changeUserRole);

module.exports = router;
