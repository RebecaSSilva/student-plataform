const studentController = require('../controllers/studentController');
const studentService = require('../services/studentService');

jest.mock('../services/studentService');

describe('getStudent', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  it('should return students', async () => {
    const mockStudents = [{ id: 1, name: 'John', email: 'john@hotmail.com', cpf: '408.254.180-20', ra: '12345678'}];
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    studentService.getStudents.mockResolvedValue(mockStudents);

    await studentController.getStudent(req, res, next);

    expect(studentService.getStudents).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents);
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching students';
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    studentService.getStudents.mockRejectedValue(new Error(errorMessage));

    await studentController.getStudent(req, res, next);

    expect(studentService.getStudents).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('createStudent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new student', async () => {
    const mockStudentData = { name: 'John Doe', email: 'john.doe@example.com', ra: '12345678', cpf: '408.254.180-20' };
    const req = { body: mockStudentData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockCreatedStudent = { id: 1, ...mockStudentData };
    studentService.createStudent.mockResolvedValue(mockCreatedStudent);

    await studentController.createStudent(req, res, next);

    expect(studentService.createStudent).toHaveBeenCalledTimes(1);
    expect(studentService.createStudent).toHaveBeenCalledWith(mockStudentData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedStudent);
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error creating student';
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    studentService.createStudent.mockRejectedValue(new Error(errorMessage));

    await studentController.createStudent(req, res, next);

    expect(studentService.createStudent).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
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

    expect(studentService.updateStudent).toHaveBeenCalledTimes(1);
    expect(studentService.updateStudent).toHaveBeenCalledWith(mockStudentId, mockStudentData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedStudent);
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error updating student';
    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    studentService.updateStudent.mockRejectedValue(new Error(errorMessage));

    await studentController.updateStudent(req, res, next);

    expect(studentService.updateStudent).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
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

    expect(studentService.deleteStudent).toHaveBeenCalledTimes(1);
    expect(studentService.deleteStudent).toHaveBeenCalledWith(mockStudentId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeleteResult);
    expect(next).not.toHaveBeenCalled();
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

    expect(studentService.deleteStudent).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});