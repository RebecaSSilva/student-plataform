import { getStudents, createStudent, deleteStudent, updateStudent } from '../services/studentService';
import errorHandler from '../utils/errorHandler';

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
    const students = await getStudents(page, pageSize);
    res.status(200).json(students);
  } catch (error) {
    errorHandler(error, res);
  }
}

/**
 * Creates a new student.
* @param {Object} studentData - The data of the student to be created.
* @param {string} studentData.name - The name of the student.
* @param {string} studentData.email - The email of the student.
* @param {bigint} studentData.ra - The registration number of the student.
* @param {bigint} studentData.cpf - The CPF (Brazilian national identification) of the student.
* @returns {Promise<Object>} A promise that resolves to the created student object.
* @throws {Error} If the email format is invalid or the CPF is invalid.
*/
async function createStudent({ name, email, ra, cpf }) {
 // Email validation using regular expression
 if (!emailRegex.test(email)) {
   throw new Error('Invalid email format');
 }

 // CPF validation using cpf-check library
 if (!cpfCheck.validate(cpf)) {
   throw new Error('Invalid CPF');
 }

 try {
   const student = await db.Student.create({ name, email, ra, cpf });
   return student.toJSON(); // Returns the data of the created student
 } catch (error) {
   errorHandler(error);
 }
}

/**
* Updates an existing student record.
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
    const result = await _deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

module.exports = {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
