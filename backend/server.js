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

// ajustar validação cpf em StudentService - sejá está em uso e formatação
// relacionar as tabelas one to many etc
// documentar o que falta
// testar migrations seed e criação do banco após concluir todos os ajustes
// tratar erros 

// front end
// adicionar as validações dos campos no front end 
// ajustar css do logout

// se der 
// git flow
// validar para pegar nome completo e não só o primeiro nome 
// usar ts
// melhorar testes
// ajustar paginação