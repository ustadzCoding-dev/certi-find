const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certification = sequelize.define('Certification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('IT', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false,
    },
    isFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    freeNote: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    skills: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    certificateType: {
        type: DataTypes.STRING,
        defaultValue: 'Certificate of Completion',
    },
    language: {
        type: DataTypes.STRING,
        defaultValue: 'English',
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    indexes: [
        { fields: ['category'] },
        { fields: ['level'] },
        { fields: ['isActive'] },
    ],
});

module.exports = Certification;
