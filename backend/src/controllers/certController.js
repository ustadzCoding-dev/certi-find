const Certification = require('../models/Certification');

// @desc    Get all certifications (with filters)
// @route   GET /api/certifications
// @access  Public
const getCertifications = async (req, res) => {
    try {
        const {
            category,
            level,
            search,
            page = 1,
            limit = 12,
            sort = '-createdAt',
        } = req.query;

        // Build query
        const query = { isActive: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (level && level !== 'all') {
            query.level = level;
        }

        if (search) {
            query.$text = { $search: search };
        }

        // Execute query with pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const certifications = await Certification.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await Certification.countDocuments(query);

        res.json({
            success: true,
            data: {
                certifications,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        console.error('GetCertifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching certifications',
        });
    }
};

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Public
const getCertificationById = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id)
            .populate('createdBy', 'name');

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.json({
            success: true,
            data: {
                certification,
            },
        });
    } catch (error) {
        console.error('GetCertificationById error:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Get certifications by category
// @route   GET /api/certifications/category/:category
// @access  Public
const getCertificationsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12 } = req.query;

        const query = {
            category,
            isActive: true
        };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const certifications = await Certification.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Certification.countDocuments(query);

        res.json({
            success: true,
            data: {
                certifications,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        console.error('GetCertificationsByCategory error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private/Admin
const createCertification = async (req, res) => {
    try {
        // Add admin user as creator
        req.body.createdBy = req.user._id;

        // Handle skills if it's a comma-separated string
        if (typeof req.body.skills === 'string') {
            req.body.skills = req.body.skills.split(',').map(s => s.trim()).filter(Boolean);
        }

        const certification = await Certification.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Certification created successfully',
            data: {
                certification,
            },
        });
    } catch (error) {
        console.error('CreateCertification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating certification',
        });
    }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
const updateCertification = async (req, res) => {
    try {
        // Handle skills if it's a comma-separated string
        if (typeof req.body.skills === 'string') {
            req.body.skills = req.body.skills.split(',').map(s => s.trim()).filter(Boolean);
        }

        const certification = await Certification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.json({
            success: true,
            message: 'Certification updated successfully',
            data: {
                certification,
            },
        });
    } catch (error) {
        console.error('UpdateCertification error:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating certification',
        });
    }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
const deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.json({
            success: true,
            message: 'Certification deleted successfully',
        });
    } catch (error) {
        console.error('DeleteCertification error:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting certification',
        });
    }
};

module.exports = {
    getCertifications,
    getCertificationById,
    getCertificationsByCategory,
    createCertification,
    updateCertification,
    deleteCertification,
};
