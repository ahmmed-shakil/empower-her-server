import { Request, Response, NextFunction } from "express";
import { StudentServices } from "./student.service";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentData = req.body;

    const newStudent = await StudentServices.createSTudentIntoDB(studentData);
    res.status(201).json({
      success: true,
      message: "Student created",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await StudentServices.getStudentFromDB();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await StudentServices.getSIngleStudentFromDB(id);
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const studentData = req.body;
    const updatedStudent = await StudentServices.updateStudent(id, studentData);
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updateStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: "Student deleted",
    });
  } catch (error) {
    next(error);
  }
};
export const studentController = {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
