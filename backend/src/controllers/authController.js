const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendWelcomeEmail, sendAdminNewUserEmail } = require('../services/emailService');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { name, email, password, interestField } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            interestField,
        });

        // Generate token
        const token = generateToken(user.id);

        // Send welcome email (async, don't wait)
        sendWelcomeEmail(user).catch(console.error);

        // Notify admin about new user (async)
        const admins = await User.findAll({ where: { role: 'admin' } });
        if (admins.length > 0) {
            sendAdminNewUserEmail(admins[0].email, user).catch(console.error);
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interestField: user.interestField,
                },
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check if user is blocked
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been blocked. Please contact support.',
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interestField: user.interestField,
                },
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        res.json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { name, interestField, currentPassword, newPassword } = req.body;

        const user = await User.findByPk(req.user.id);

        // Update basic info
        if (name) user.name = name;
        if (interestField) user.interestField = interestField;

        // Update password if provided
        if (newPassword) {
            // Verify current password
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect',
                });
            }
            user.password = newPassword;
        }

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interestField: user.interestField,
                },
            },
        });
    } catch (error) {
        console.error('UpdateProfile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during profile update',
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    updateProfile,
};
