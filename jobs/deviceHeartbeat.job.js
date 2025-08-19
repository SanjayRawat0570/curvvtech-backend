const cron = require('node-cron');
const Device = require('../models/device.model');
const { Op } = require('sequelize');

const deactivateInactiveDevices = () => {
  
  cron.schedule('0 * * * *', async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    console.log('Running background job to check for inactive devices');
    
    try {
      const [affectedRows] = await Device.update(
        { status: 'inactive' },
        {
          where: {
            status: 'active',
            last_active_at: { [Op.lt]: twentyFourHoursAgo },
          },
        }
      );
      console.log(`Deactivated ${affectedRows} devices.`);
    } catch (error) {
      console.error('Error in device deactivation job:', error);
    }
  });
};

module.exports = deactivateInactiveDevices;