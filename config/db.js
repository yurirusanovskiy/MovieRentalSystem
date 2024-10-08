const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './MovieRentalSystem.db'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQLite database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const disconnectDB = async () => {
  try {
    await sequelize.close();
    console.log('Connection to SQLite database has been closed.');
  } catch (error) {
    console.error('Error closing the connection:', error);
  }
};

module.exports = { sequelize, connectDB, disconnectDB };
