const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        provider: {
            type: String,
            required: [true, 'Provider is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [50, 'Description must be at least 50 characters'],
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
        },
        level: {
            type: String,
            required: [true, 'Level is required'],
            enum: ['Beginner', 'Intermediate', 'Advanced'],
        },
        isFree: {
            type: Boolean,
            default: true,
        },
        freeNote: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            required: [true, 'URL is required'],
            match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
        },
        skills: [{
            type: String,
            trim: true,
        }],
        certificateType: {
            type: String,
            default: 'Certificate of Completion',
        },
        language: {
            type: String,
            default: 'English',
        },
        thumbnail: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for search and filtering
certificationSchema.index({ title: 'text', description: 'text', provider: 'text' });
certificationSchema.index({ category: 1 });
certificationSchema.index({ level: 1 });
certificationSchema.index({ isActive: 1 });

module.exports = mongoose.model('Certification', certificationSchema);
