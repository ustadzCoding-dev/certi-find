require('dotenv').config();
const { User, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        // Sync database
        await sequelize.sync();
        console.log('✓ Database synced');

        // Check if admin already exists
        const adminExists = await User.findOne({
            where: { role: 'admin' }
        });

        if (adminExists) {
            console.log('✓ Admin user already exists');
            console.log(`  Email: ${adminExists.email}`);
            console.log(`  Name: ${adminExists.name}`);
            process.exit(0);
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@certifind.com',
            password: 'admin123456', // Will be hashed by bcryptjs hook
            role: 'admin',
            interestField: 'IT',
            isActive: true,
        });

        console.log('✓ Admin user created successfully!');
        console.log('\nAdmin Credentials:');
        console.log('  Email: admin@certifind.com');
        console.log('  Password: admin123456');
        console.log('\n⚠️  IMPORTANT: Change this password in production!');
        console.log('\nYou can now login with these credentials.');

        process.exit(0);
    } catch (error) {
        console.error('✗ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
