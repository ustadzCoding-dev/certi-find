const { Certification, User } = require('../models');
const { Op } = require('sequelize');

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
            sort = 'createdAt',
        } = req.query;

        // Build where clause
        const where = { isActive: true };

        if (category && category !== 'all') {
            where.category = category;
        }

        if (level && level !== 'all') {
            where.level = level;
        }

        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { provider: { [Op.like]: `%${search}%` } },
            ];
        }

        // Execute query with pagination
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const order = sort.startsWith('-') ? [[sort.slice(1), 'DESC']] : [[sort, 'ASC']];

        const { count, rows } = await Certification.findAndCountAll({
            where,
            include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
            order,
            offset,
            limit: parseInt(limit),
        });

        res.json({
            success: true,
            data: {
                certifications: rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                    pages: Math.ceil(count / parseInt(limit)),
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
        const certification = await Certification.findByPk(req.params.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
        });

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

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await Certification.findAndCountAll({
            where: { category, isActive: true },
            order: [['createdAt', 'DESC']],
            offset,
            limit: parseInt(limit),
        });

        res.json({
            success: true,
            data: {
                certifications: rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                    pages: Math.ceil(count / parseInt(limit)),
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
        req.body.createdBy = req.user.id;

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

        const certification = await Certification.findByPk(req.params.id);

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        await certification.update(req.body);

        res.json({
            success: true,
            message: 'Certification updated successfully',
            data: {
                certification,
            },
        });
    } catch (error) {
        console.error('UpdateCertification error:', error);
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
        const certification = await Certification.findByPk(req.params.id);

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        await certification.destroy();

        res.json({
            success: true,
            message: 'Certification deleted successfully',
        });
    } catch (error) {
        console.error('DeleteCertification error:', error);
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
