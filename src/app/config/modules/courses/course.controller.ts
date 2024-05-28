import { NextFunction, Request, Response } from "express";
import { courseServices } from "./course.service";
import { TCourse } from "./course.interface";
import { moduleServices } from "../modules/module.service";
import { lessonServices } from "../lesson/lesson.service";

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseData, modules } = req.body;
    console.log("🚀 ~ modules:", modules);

    const courseResult = await courseServices.createCourse(courseData);
    if (courseResult) {
      for (const moduleData of modules) {
        const { title, lessons } = moduleData;

        const moduleResult = await moduleServices.createModule({
          title,
          courseId: courseResult._id,
          isDeleted: false,
        });

        if (moduleResult) {
          for (const lessonData of lessons) {
            await lessonServices.createLesson({
              ...lessonData,
              moduleId: moduleResult._id,
            });
          }
        }
      }
    }
    res
      .status(201)
      .json({ success: true, message: "Course created", data: courseResult });
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await courseServices.getCourses();
    res.status(200).json(result);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    next(error);
  }
};
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await courseServices.deleteCourse(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const courseControllers = {
  createCourse,
  getCourses,
  deleteCourse,
};
