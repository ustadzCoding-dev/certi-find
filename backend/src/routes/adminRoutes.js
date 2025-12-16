const express = require('express');
const router = express.Router();
const {
    getStats,
    getUsers,
    toggleUserBlock,
    changeUserRole,
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// All routes require admin authentication
router.use(auth, admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/block', toggleUserBlock);
router.put('/users/:id/role', changeUserRole);

module.exports = router;
