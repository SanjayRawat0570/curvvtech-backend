const deviceService = require('../services/device.service');
const { registerDeviceSchema, updateDeviceSchema, heartbeatSchema } = require('../validations/device.validation');

const registerDevice = async (req, res) => {
  try {
    const { error } = registerDeviceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { id: owner_id } = req.user;
    const device = await deviceService.registerDevice(req.body, owner_id);
    res.status(201).json({ success: true, device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const listDevices = async (req, res) => {
  try {
    const { id: owner_id } = req.user;
    const filters = req.query;
    const devices = await deviceService.getDevices(owner_id, filters);
    res.status(200).json({ success: true, devices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;
    const { error } = updateDeviceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const device = await deviceService.updateDevice(id, owner_id, req.body);
    res.status(200).json({ success: true, device });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;
    const result = await deviceService.deleteDevice(id, owner_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const recordHeartbeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;
    const { error } = heartbeatSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { status } = req.body;
    const result = await deviceService.recordHeartbeat(id, owner_id, status);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerDevice,
  listDevices,
  updateDevice,
  deleteDevice,
  recordHeartbeat
};