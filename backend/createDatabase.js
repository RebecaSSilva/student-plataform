const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Carregar o arquivo de configuração do banco de dados
const configPath = path.resolve(__dirname, 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Configurar a conexão com o banco de dados
const sequelize = new Sequelize(config[process.env.NODE_ENV]);

// Obter o nome do banco de dados do arquivo de configuração
const databaseName = config[process.env.NODE_ENV].database;

// Função para criar o banco de dados
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

createDatabase();
