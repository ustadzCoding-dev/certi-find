const Bookmark = require('../models/Bookmark');
const Certification = require('../models/Certification');
const { sendBookmarkEmail } = require('../services/emailService');

// @desc    Get user's bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user._id })
            .populate({
                path: 'certificationId',
                select: 'title provider category level duration isFree description thumbnail skills',
            })
            .sort('-createdAt');

        res.json({
            success: true,
            data: {
                bookmarks,
                count: bookmarks.length,
            },
        });
    } catch (error) {
        console.error('GetBookmarks error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching bookmarks',
        });
    }
};

// @desc    Add bookmark
// @route   POST /api/bookmarks
// @access  Private
const addBookmark = async (req, res) => {
    try {
        const { certificationId } = req.body;

        // Check if certification exists
        const certification = await Certification.findById(certificationId);
        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        // Check if already bookmarked
        const existingBookmark = await Bookmark.findOne({
            userId: req.user._id,
            certificationId,
        });

        if (existingBookmark) {
            return res.status(400).json({
                success: false,
                message: 'Certification already bookmarked',
            });
        }

        // Create bookmark
        const bookmark = await Bookmark.create({
            userId: req.user._id,
            certificationId,
        });

        // Send bookmark confirmation email (async)
        sendBookmarkEmail(req.user, certification).catch(console.error);

        // Populate certification data
        await bookmark.populate('certificationId');

        res.status(201).json({
            success: true,
            message: 'Certification bookmarked successfully',
            data: {
                bookmark,
            },
        });
    } catch (error) {
        console.error('AddBookmark error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Certification already bookmarked',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while adding bookmark',
        });
    }
};

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:certId
// @access  Private
const removeBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOneAndDelete({
            userId: req.user._id,
            certificationId: req.params.certId,
        });

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: 'Bookmark not found',
            });
        }

        res.json({
            success: true,
            message: 'Bookmark removed successfully',
        });
    } catch (error) {
        console.error('RemoveBookmark error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while removing bookmark',
        });
    }
};

// @desc    Check if certification is bookmarked
// @route   GET /api/bookmarks/check/:certId
// @access  Private
const checkBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            userId: req.user._id,
            certificationId: req.params.certId,
        });

        res.json({
            success: true,
            data: {
                isBookmarked: !!bookmark,
            },
        });
    } catch (error) {
        console.error('CheckBookmark error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

module.exports = {
    getBookmarks,
    addBookmark,
    removeBookmark,
    checkBookmark,
};
