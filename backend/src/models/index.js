const sequelize = require('../config/database');
const User = require('./User');
const Certification = require('./Certification');
const Bookmark = require('./Bookmark');

// Define associations
User.hasMany(Certification, { foreignKey: 'createdBy', as: 'certifications' });
Certification.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks' });
Bookmark.belongsTo(User, { foreignKey: 'userId' });

Certification.hasMany(Bookmark, { foreignKey: 'certificationId', as: 'bookmarkedBy' });
Bookmark.belongsTo(Certification, { foreignKey: 'certificationId' });

module.exports = {
    sequelize,
    User,
    Certification,
    Bookmark,
};
