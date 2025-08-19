const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const devicesController = require('../controllers/devices.controller');

router.post('/', auth, devicesController.registerDevice);
router.get('/', auth, devicesController.listDevices);
router.patch('/:id', auth, devicesController.updateDevice);
router.delete('/:id', auth, devicesController.deleteDevice);
router.post('/:id/heartbeat', auth, devicesController.recordHeartbeat);

module.exports = router;