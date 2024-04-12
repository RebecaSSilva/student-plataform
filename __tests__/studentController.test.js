const studentController = require('../controllers/studentController');
const studentService = require('../services/studentService');

jest.mock('../services/studentService');

describe('getStudent', () => {
  afterEach(() => {
    studentService.getStudents.mockRestore();
  });

  it('should return students', async () => {
    const mockStudents = [{ id: 1, name: 'John', cpf: '408.254.180-20', ra: '12345678'}];
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
