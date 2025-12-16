const User = require('../models/User');
const Certification = require('../models/Certification');
const Bookmark = require('../models/Bookmark');

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
            User.countDocuments(),
            Certification.countDocuments(),
            Bookmark.countDocuments(),
            User.countDocuments({ isActive: true }),
            Certification.countDocuments({ isActive: true }),
        ]);

        // Get category distribution
        const categoryStats = await Certification.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Get recent users (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newUsersThisWeek = await User.countDocuments({
            createdAt: { $gte: oneWeekAgo },
        });

        // Get recent registrations
        const recentUsers = await User.find()
            .sort('-createdAt')
            .limit(5)
            .select('name email interestField createdAt');

        // Get recent certifications
        const recentCertifications = await Certification.find()
            .sort('-createdAt')
            .limit(5)
            .select('title provider category createdAt');

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

        // Build query
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        if (role && role !== 'all') {
            query.role = role;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const users = await User.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
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
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prevent blocking yourself
        if (user._id.toString() === req.user._id.toString()) {
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

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

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

        const user = await User.findById(req.params.id);

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

module.exports = {
    getStats,
    getUsers,
    toggleUserBlock,
    changeUserRole,
};
