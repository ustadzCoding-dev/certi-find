const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    interestField: Joi.string()
        .valid('IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other')
        .default('Other'),
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(50).messages({
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name cannot exceed 50 characters',
    }),
    interestField: Joi.string()
        .valid('IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'),
    currentPassword: Joi.string(),
    newPassword: Joi.string().min(6).messages({
        'string.min': 'Password must be at least 6 characters',
    }),
}).with('newPassword', 'currentPassword');

// Certification validation schema
const certificationSchema = Joi.object({
    title: Joi.string().max(200).required().messages({
        'string.max': 'Title cannot exceed 200 characters',
        'any.required': 'Title is required',
    }),
    provider: Joi.string().required().messages({
        'any.required': 'Provider is required',
    }),
    category: Joi.string()
        .valid('IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other')
        .required()
        .messages({
            'any.required': 'Category is required',
        }),
    description: Joi.string().min(50).required().messages({
        'string.min': 'Description must be at least 50 characters',
        'any.required': 'Description is required',
    }),
    duration: Joi.string().required().messages({
        'any.required': 'Duration is required',
    }),
    level: Joi.string()
        .valid('Beginner', 'Intermediate', 'Advanced')
        .required()
        .messages({
            'any.required': 'Level is required',
        }),
    isFree: Joi.boolean().default(true),
    freeNote: Joi.string().allow(''),
    url: Joi.string().uri().required().messages({
        'string.uri': 'Please enter a valid URL',
        'any.required': 'URL is required',
    }),
    skills: Joi.array().items(Joi.string()).default([]),
    certificateType: Joi.string().default('Certificate of Completion'),
    language: Joi.string().default('English'),
    thumbnail: Joi.string().uri().allow(''),
    isActive: Joi.boolean().default(true),
});

// Update certification validation schema
const updateCertificationSchema = Joi.object({
    title: Joi.string().max(200),
    provider: Joi.string(),
    category: Joi.string()
        .valid('IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'),
    description: Joi.string().min(50),
    duration: Joi.string(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
    isFree: Joi.boolean(),
    freeNote: Joi.string().allow(''),
    url: Joi.string().uri(),
    skills: Joi.array().items(Joi.string()),
    certificateType: Joi.string(),
    language: Joi.string(),
    thumbnail: Joi.string().uri().allow(''),
    isActive: Joi.boolean(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    certificationSchema,
    updateCertificationSchema,
};
