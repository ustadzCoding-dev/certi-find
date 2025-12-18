const { User, Certification, Bookmark, sequelize } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        // Get counts
        const [
            totalUsers,
            totalCertifications,
            totalBookmarks,
            activeUsers,
            activeCertifications,
        ] = await Promise.all([
            User.count(),
            Certification.count(),
            Bookmark.count(),
            User.count({ where: { isActive: true } }),
            Certification.count({ where: { isActive: true } }),
        ]);

        // Get category distribution
        const categoryStats = await Certification.findAll({
            attributes: [
                'category',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
            ],
            where: { isActive: true },
            group: ['category'],
            raw: true,
            order: [[sequelize.literal('count'), 'DESC']],
        });

        // Get recent users (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newUsersThisWeek = await User.count({
            where: {
                createdAt: { [Op.gte]: oneWeekAgo },
            },
        });

        // Get recent registrations
        const recentUsers = await User.findAll({
            attributes: ['id', 'name', 'email', 'interestField', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 5,
        });

        // Get recent certifications
        const recentCertifications = await Certification.findAll({
            attributes: ['id', 'title', 'provider', 'category', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 5,
        });

        res.json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalCertifications,
                    totalBookmarks,
                    activeUsers,
                    activeCertifications,
                    newUsersThisWeek,
                },
                categoryStats,
                recentUsers,
                recentCertifications,
            },
        });
    } catch (error) {
        console.error('GetStats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching statistics',
        });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, role } = req.query;

        // Build where clause
        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ];
        }

        if (role && role !== 'all') {
            where.role = role;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await User.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            offset,
            limit: parseInt(limit),
        });

        res.json({
            success: true,
            data: {
                users: rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                    pages: Math.ceil(count / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        console.error('GetUsers error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users',
        });
    }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const toggleUserBlock = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prevent blocking yourself
        if (user.id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'You cannot block yourself',
            });
        }

        // Toggle isActive
        user.isActive = !user.isActive;
        await user.save();

        res.json({
            success: true,
            message: `User ${user.isActive ? 'unblocked' : 'blocked'} successfully`,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error('ToggleUserBlock error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Change user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role',
            });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        user.role = role;
        await user.save();

        res.json({
            success: true,
            message: `User role changed to ${role}`,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error('ChangeUserRole error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Seed admin user (one-time setup)
// @route   POST /api/admin/seed
// @access  Public (one-time only)
const seedAdmin = async (req, res) => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({
            where: { role: 'admin' }
        });

        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin user already exists',
                data: {
                    email: adminExists.email,
                    name: adminExists.name,
                }
            });
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@certifind.com',
            password: 'admin123456',
            role: 'admin',
            interestField: 'IT',
            isActive: true,
        });

        res.json({
            success: true,
            message: 'Admin user created successfully!',
            data: {
                admin: {
                    email: adminUser.email,
                    name: adminUser.name,
                    credentials: {
                        email: 'admin@certifind.com',
                        password: 'admin123456',
                    },
                    warning: 'IMPORTANT: Change this password in production!'
                }
            }
        });
    } catch (error) {
        console.error('SeedAdmin error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while seeding admin',
            error: error.message
        });
    }
};

// @desc    Promote user to admin by email
// @route   POST /api/admin/promote
// @access  Public (one-time setup)
const promoteToAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.role = 'admin';
        await user.save();

        res.json({
            success: true,
            message: `User ${email} promoted to admin successfully!`,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('PromoteToAdmin error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while promoting user',
            error: error.message
        });
    }
};

// @desc    Reset user password by email
// @route   POST /api/admin/reset-password
// @access  Public (one-time setup)
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update password (will be hashed by User model hook)
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: `Password reset successfully for ${email}`,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('ResetPassword error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while resetting password',
            error: error.message
        });
    }
};

module.exports = {
    getStats,
    getUsers,
    toggleUserBlock,
    changeUserRole,
    seedAdmin,
    promoteToAdmin,
    resetPassword,
};
