const  Sequelize  = require('sequelize');
const fs = require('fs');
const path = require('path');

// Carregar o arquivo de configuração do banco de dados
const configPath = path.resolve(__dirname, 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Configurar a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || config[process.env.NODE_ENV].dialect, 
  host: process.env.DB_HOST || config[process.env.NODE_ENV].host,
  port: process.env.DB_PORT || config[process.env.NODE_ENV].port,
  username: process.env.DB_USER || config[process.env.NODE_ENV].username,
  password: process.env.DB_PASS || config[process.env.NODE_ENV].password,
  database: process.env.DB_NAME || config[process.env.NODE_ENV].database
});

// Função para criar o banco de dados
async function createDatabase() {
  const databaseName = sequelize.config.database;
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
    console.log(`Database '${databaseName}' created successfully`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
