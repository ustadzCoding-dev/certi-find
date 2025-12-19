require('dotenv').config();
const { sequelize, User } = require('../models');

const userEmailToPromote = process.env.USER_EMAIL_TO_PROMOTE;

if (!userEmailToPromote) {
    console.error('Error: Please set the USER_EMAIL_TO_PROMOTE environment variable.');
    process.exit(1);
}

const promoteUser = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced.');
        console.log(`Searching for user with email: '${userEmailToPromote}'`);

        const user = await User.findOne({ where: { email: userEmailToPromote } });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`Successfully promoted ${user.email} to admin.`);
        } else {
            console.log(`User with email ${userEmailToPromote} not found.`);
        }
    } catch (error) {
        console.error('Error promoting user:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

promoteUser();
