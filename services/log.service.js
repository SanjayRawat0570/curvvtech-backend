const Log = require('../models/log.model');
const { Op } = require('sequelize');
const Device = require('../models/device.model');

const createLogEntry = async (deviceId, logData) => {
  await Log.create({ ...logData, device_id: deviceId });
  return { success: true, message: 'Log entry created' };
};

const getLastLogs = async (deviceId, limit = 10) => {
  const logs = await Log.findAll({
    where: { device_id: deviceId },
    order: [['timestamp', 'DESC']],
    limit: parseInt(limit),
  });
  return { success: true, logs };
};

const getAggregatedUsage = async (deviceId, range = '24h') => {
  const now = new Date();
  let startTime;

  switch (range) {
    case '24h':
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    default:
      throw new Error('Invalid range specified');
  }

  const result = await Log.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('value')), 'total_units']
    ],
    where: {
      device_id: deviceId,
      timestamp: {
        [Op.between]: [startTime, now],
      },
    },
    raw: true,
  });

  const total_units = result[0].total_units || 0;
  return { success: true, device_id: deviceId, total_units_last_24h: total_units };
};

module.exports = {
  createLogEntry,
  getLastLogs,
  getAggregatedUsage,
};