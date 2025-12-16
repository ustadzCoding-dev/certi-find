const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema, updateProfileSchema } = require('../validators/schemas');

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', auth, getMe);
router.put('/profile', auth, validate(updateProfileSchema), updateProfile);

module.exports = router;
