const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        certificationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certification',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound unique index to prevent duplicate bookmarks
bookmarkSchema.index({ userId: 1, certificationId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
