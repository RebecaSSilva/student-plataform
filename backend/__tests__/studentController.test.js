const studentController = require('../controllers/studentController');
const studentService = require('../services/studentService');

jest.mock('../services/studentService');
// Importe o studentController e o studentService

describe('getStudent', () => {
afterEach(() => {
  jest.clearAllMocks(); 
});

it('should return students', async () => {
  const mockStudents = [{ id: 1, name: 'John', email: 'john@hotmail.com', cpf: '40825418020', ra: '12345678' }];
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  // Mockando a função getStudents corretamente
  studentService.getStudents = jest.fn().mockResolvedValue(mockStudents);

  await studentController.getStudent(req, res, next);

});

it('should handle errors', async () => {
  const errorMessage = 'Error fetching students';
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  // Mockando a função getStudents para retornar um erro
  studentService.getStudents = jest.fn().mockRejectedValue(new Error(errorMessage));

  await studentController.getStudent(req, res, next);

});
});

describe('createStudent', () => {
afterEach(() => {
  jest.clearAllMocks();
});

it('should create a new student', async () => {
  const mockStudentData = { name: 'John Doe', email: 'john.doe@example.com', cpf: '40825418020' };
  const req = { body: mockStudentData };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockCreatedStudent = { id: 1, ...mockStudentData };
  studentService.createStudent = jest.fn().mockResolvedValue(mockCreatedStudent);

  await studentController.createStudent(req, res, next);

});

it('should handle errors', async () => {
  const errorMessage = 'Error creating student';
  const req = { body: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  studentService.createStudent = jest.fn().mockRejectedValue(new Error(errorMessage));

  await studentController.createStudent(req, res, next);

});
});


describe('updateStudent', () => {
afterEach(() => {
  jest.clearAllMocks();
});

it('should update an existing student', async () => {
  const mockStudentId = 1;
  const mockStudentData = { name: 'John Doe', email: 'john.doe@example.com' };
  const req = { params: { id: mockStudentId }, body: mockStudentData };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockUpdatedStudent = { id: mockStudentId, ...mockStudentData };
  studentService.updateStudent.mockResolvedValue(mockUpdatedStudent);

  await studentController.updateStudent(req, res, next);

});

it('should handle errors', async () => {
  const errorMessage = 'Error updating student';
  const req = { params: { id: 1 }, body: { name: 'John Doe', email: 'john.doe@example.com' } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  studentService.updateStudent.mockRejectedValue(new Error(errorMessage));

  await studentController.updateStudent(req, res, next);

});
});

describe('deleteStudent', () => {
afterEach(() => {
  jest.clearAllMocks();
});

it('should delete an existing student', async () => {
  const mockStudentId = 1;
  const req = { params: { id: mockStudentId } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockDeleteResult = { message: 'Student deleted successfully' };
  studentService.deleteStudent.mockResolvedValue(mockDeleteResult);

  await studentController.deleteStudent(req, res, next);

});

it('should handle errors', async () => {
  const errorMessage = 'Error deleting student';
  const req = { params: { id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  studentService.deleteStudent.mockRejectedValue(new Error(errorMessage));

  await studentController.deleteStudent(req, res, next);

});
});