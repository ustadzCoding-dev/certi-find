const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    certificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Certifications',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    indexes: [
        {
            fields: ['userId', 'certificationId'],
            unique: true,
        },
    ],
});

module.exports = Bookmark;
