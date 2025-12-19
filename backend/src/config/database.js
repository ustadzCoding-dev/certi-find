const { Sequelize } = require('sequelize');
const path = require('path');

const storagePath = process.env.NODE_ENV === 'production'
  ? '/data/certifind.db' 
  : path.join(__dirname, '../../certifind.db');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
        timestamps: true,
        underscored: false,
    },
});

module.exports = sequelize;
