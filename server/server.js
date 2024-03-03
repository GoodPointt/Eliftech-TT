const app = require('./app');
const mongoose = require('mongoose');
const schedule = require('node-schedule');

const { DEV_PORT, REQ_URL } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.DEV_PORT, () => {
      console.log(`🛠️  Server is up and ready on port: ${DEV_PORT}`);
    });
  })
  .then(() => console.log('🌐 Database connected successfully'))
  .catch((error) => {
    console.log('⚠️ Database conection failed:', error.message);
    process.exit(1);
  });

const job = schedule.scheduleJob('*/14 * * * *', async () => {
  try {
    const response = await fetch(REQ_URL);
    if (response.ok) {
      console.log('✅ Server healthy!');
    } else {
      const errorText = await response.text();
      console.error('❌ Health check failed:', response.status, errorText);
    }
  } catch (error) {
    console.error('❌ Error to GET health:', error.message);
  }
});
