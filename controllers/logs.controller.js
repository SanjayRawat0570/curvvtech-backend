const logService = require('../services/log.service');
const deviceService = require('../services/device.service');
const { logEntrySchema } = require('../validations/log.validation');

const createLogEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;

    const device = await deviceService.getDeviceById(id);
    if (!device || device.owner_id !== owner_id) {
      return res.status(404).json({ success: false, message: 'Device not found or not owned by user' });
    }

    const { error } = logEntrySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await logService.createLogEntry(id, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getLastLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;

    const device = await deviceService.getDeviceById(id);
    if (!device || device.owner_id !== owner_id) {
      return res.status(404).json({ success: false, message: 'Device not found or not owned by user' });
    }
    
    const { limit } = req.query;
    const result = await logService.getLastLogs(id, limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAggregatedUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: owner_id } = req.user;

    const device = await deviceService.getDeviceById(id);
    if (!device || device.owner_id !== owner_id) {
      return res.status(404).json({ success: false, message: 'Device not found or not owned by user' });
    }

    const { range } = req.query;
    const result = await logService.getAggregatedUsage(id, range);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createLogEntry,
  getLastLogs,
  getAggregatedUsage,
};