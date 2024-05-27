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

    const courseResult = await courseServices.createCourse(courseData);
    if (courseResult) {
      for (const moduleData of modules) {
        const { moduleInfo, lessons } = moduleData;

        const moduleResult = await moduleServices.createModule({
          ...moduleInfo,
          courseId: courseResult._id,
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
