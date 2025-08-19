const Device = require('../models/device.model');
const { Op } = require('sequelize');

const registerDevice = async (deviceData, owner_id) => {
  const device = await Device.create({ ...deviceData, owner_id });
  return device;
};

const getDevices = async (owner_id, filters) => {
  const whereClause = { owner_id };
  if (filters.type) {
    whereClause.type = filters.type;
  }
  if (filters.status) {
    whereClause.status = filters.status;
  }
  const devices = await Device.findAll({ where: whereClause });
  return devices;
};

const getDeviceById = async (id) => {
  const device = await Device.findByPk(id);
  return device;
};

const updateDevice = async (id, owner_id, updateData) => {
  const device = await Device.findOne({ where: { id, owner_id } });
  if (!device) {
    throw new Error('Device not found or not owned by user');
  }
  await device.update(updateData);
  return device;
};

const deleteDevice = async (id, owner_id) => {
  const deletedCount = await Device.destroy({ where: { id, owner_id } });
  if (deletedCount === 0) {
    throw new Error('Device not found or not owned by user');
  }
  return { success: true, message: 'Device deleted successfully' };
};

const recordHeartbeat = async (id, owner_id, status) => {
  const device = await Device.findOne({ where: { id, owner_id } });
  if (!device) {
    throw new Error('Device not found or not owned by user');
  }
  const now = new Date();
  await device.update({ last_active_at: now, status });
  return { success: true, message: 'Device heartbeat recorded', last_active_at: now };
};

module.exports = {
  registerDevice,
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
  recordHeartbeat
};