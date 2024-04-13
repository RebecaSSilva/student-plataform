// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:8081', // Permitir apenas solicitações do frontend hospedado em http://localhost:8081
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos específicos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir cabeçalhos específicos
}));

// Connect to database
db.sequelize.sync()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log('Error connecting to database:', err));

// Setup routes
app.use('/api/student', studentRoutes);
app.use('/api/user', authRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// git flow
// testar migrations seed e criação do banco após concluir todos os ajustes
// melhorar os testes | validacao cpf e email
// documentar o que falta
// adicionar logout
// no frontend 
// adicionar getStudentById