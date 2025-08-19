const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, 
});

module.exports = sequelize;