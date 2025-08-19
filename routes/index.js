const express = require('express');
const router = express.Router();

// Route files
const authRoutes = require('./auth.routes');
const devicesRoutes = require('./devices.routes');
const logsRoutes = require('./logs.routes');

router.use('/auth', authRoutes);
router.use('/devices', devicesRoutes);
router.use('/devices', logsRoutes); // Note: Logs routes are nested under /devices

module.exports = router;