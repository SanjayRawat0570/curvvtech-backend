const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const allRoutes = require('./routes/index');
const deactivateInactiveDevices = require('./jobs/deviceHeartbeat.job');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api', allRoutes);


deactivateInactiveDevices();


sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  });

  