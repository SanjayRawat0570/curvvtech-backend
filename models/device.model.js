const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  last_active_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  
  owner_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },
}, {
  timestamps: true,
});


User.hasMany(Device, { foreignKey: 'owner_id' });

Device.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Device;