const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const logsController = require('../controllers/logs.controller');

router.post('/:id/logs', auth, logsController.createLogEntry);
router.get('/:id/logs', auth, logsController.getLastLogs);
router.get('/:id/usage', auth, logsController.getAggregatedUsage);

module.exports = router;