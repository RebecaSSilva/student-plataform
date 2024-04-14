const studentService = require('../services/studentService');
const errorHandler = require('../utils/errorHandler');

/**
 * Retrieves all students from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the retrieved students or an error.
 */
async function getStudent(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const students = await studentService.getStudents(page, pageSize);
    res.status(200).json(students);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getStudentById(req, res) {
  try {
    const studentId = req.params.id; // Obtém o ID do parâmetro da URL
    const student = await studentService.getStudent(studentId); // Chama o serviço para obter o estudante por ID
    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado' }); // Retorna um erro 404 se o estudante não for encontrado
    }
    res.status(200).json(student); // Retorna o estudante encontrado
  } catch (error) {
    errorHandler(error, res); 
  }
}
/**
 * Creates a new student.
* @param {string} studentData.name - The name of the student.
* @param {string} studentData.email - The email of the student.
* @param {bigint} studentData.cpf - The CPF (Brazilian national identification) of the student.
* @returns {Promise<Object>} A promise that resolves to the created student object.
* @throws {Error} If the email format is invalid or the CPF is invalid.
*/
async function createStudent(req, res) {
  try {
    const { name, email, cpf } = req.body;
    const createdStudent = await studentService.createStudent({ name, email, cpf });
    res.status(201).json(createdStudent);
  } catch (error) {
    errorHandler(error, res);
  }
}

/**
* Updates an existing student record in the database.
* @param {number} id - The ID of the student to be updated.
* @param {Object} updatedData - The updated data of the student.
* @param {string} updatedData.name - The updated name of the student.
* @param {string} updatedData.email - The updated email of the student.
* @returns {Promise<Object>} A promise that resolves to the updated student object.
* @throws {Error} If the student with the specified ID is not found.
*/
async function updateStudent(id, { name, email }) {
 try {
   const student = await db.Student.findByPk(id);
   if (!student) {
     throw new Error('Student not found');
   }
   await student.update({ name, email });
   return student.toJSON(); // Returns the data of the updated student
 } catch (error) {
   errorHandler(error);
 }
}

/**
 * Deletes an existing student.
 * @param {Object} req - The request object containing the student ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with a success message or an error.
 */
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService.deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

module.exports = {
  getStudent,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
