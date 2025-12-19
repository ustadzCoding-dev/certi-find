const sequelize = require('../config/database');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const createSuperAdmin = async () => {
  const adminEmail = 'superadmin@airsworld.net';
  const adminPassword = 'admiN@123';

  try {
    await sequelize.sync();

    // Find and delete existing user to ensure password gets hashed
    const existingUser = await User.findOne({ where: { email: adminEmail } });
    if (existingUser) {
      await existingUser.destroy();
      console.log(`Removed existing user ${adminEmail}.`);
    }

    // Create the super admin
    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: adminPassword, // The hook will now hash this correctly
      role: 'admin',
      isActive: true
    });

    console.log(`Super admin account ${adminEmail} created successfully.`);

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

createSuperAdmin();
