const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Load the database configuration file
const configPath = path.resolve(__dirname, 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Configure the database connection
const sequelize = new Sequelize(config[process.env.NODE_ENV]);

// Get the database name from the configuration file
const databaseName = config[process.env.NODE_ENV].database;

/**
 * Function to create the database if it does not exist.
 * @returns {Promise<void>} A promise that resolves once the database is created or throws an error if creation fails.
 */
async function createDatabase() {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
    console.log(`Database '${databaseName}' created successfully`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
}

// Call the function to create the database
createDatabase();
