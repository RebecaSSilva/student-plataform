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

app.use(cors());
// CORS middleware
/* 
app.use(cors({
  origin: 'http://localhost:8081', // Permitir apenas solicitações do frontend hospedado em http://localhost:8081
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos específicos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir cabeçalhos específicos
}));
*/
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


// documentar o que falta
// ajustar css do logout
// no frontend 
// adicionar getStudentById
// ajustar cors aqui
// ajustar validação do email em StudentService
// Se for criar estudante ele mostra nao exibe RA se for editar o campo CPF e RA não podem ser editados 
// deixar services exportando da mesma forma
// add docker 
// testar migrations seed e criação do banco após concluir todos os ajustes
// melhorar os testes | validacao cpf e email
// git flow
// colocar back end dentro de uma pasta
// relacionar as tabelas one to many etc
// ajustar a rota de login do front end para pegar direto do back end 
// adicionar as validações dos campso no front end 
// usar ts
