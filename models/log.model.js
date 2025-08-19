const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Device = require('./device.model');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  
  device_id: {
    type: DataTypes.UUID,
    references: {
      model: Device,
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },
}, {
  timestamps: false,
});


Device.hasMany(Log, { foreignKey: 'device_id' });
Log.belongsTo(Device, { foreignKey: 'device_id' });

module.exports = Log;