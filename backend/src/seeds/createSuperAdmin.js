const sequelize = require('../config/database');
const { User } = require('../models');

const createSuperAdmin = async () => {
  const adminEmail = 'superadmin@airsworld.net';
  const adminPassword = 'admiN@123';

  try {
    await sequelize.sync();

    const [user, created] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true
      }
    });

    if (created) {
      console.log(`Super admin account ${adminEmail} created successfully.`);
    } else {
      console.log(`Super admin account ${adminEmail} already exists.`);
    }

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

createSuperAdmin();
