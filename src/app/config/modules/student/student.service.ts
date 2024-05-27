import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createSTudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.email)) {
    throw new Error("Email already exists");
  }
  const response = await Student.create(studentData);
  return response;
};

const getStudentFromDB = async () => {
  const response = await Student.find();
  return response;
};

const getSIngleStudentFromDB = async (id: string) => {
  const response = await Student.findById({ _id: id });
  if (!response) {
    throw new Error("Student not found");
  }
  return response;
};

const updateStudent = async (id: string, studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.email)) {
    throw new Error("This email already exists");
  }
  const result = await Student.findOneAndUpdate({ _id: id }, studentData, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const response = await Student.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  if (response) {
    return null;
  } else {
    throw new Error("Student not found");
  }
};

export const StudentServices = {
  createSTudentIntoDB,
  getStudentFromDB,
  getSIngleStudentFromDB,
  updateStudent,
  deleteStudentFromDB,
};
