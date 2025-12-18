const { User } = require('../models');
const bcrypt = require('bcryptjs');

const resetPassword = async () => {
    try {
        const email = process.argv[2];
        const newPassword = process.argv[3];

        if (!email || !newPassword) {
            console.log('Usage: node resetPassword.js <email> <new-password>');
            process.exit(1);
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log(`User with email ${email} not found`);
            process.exit(1);
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        console.log('✅ Password reset successfully!');
        console.log(`Email: ${email}`);
        console.log(`New Password: ${newPassword}`);
        console.log('\nYou can now login with the new password.');

        process.exit(0);
    } catch (error) {
        console.error('Error resetting password:', error);
        process.exit(1);
    }
};

resetPassword();
