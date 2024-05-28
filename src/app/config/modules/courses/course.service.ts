import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getCourses = async () => {
  const result = await Course.find();
  return result;
};

const getCourseById = async (id: string) => {
  const result = await Course.findOne({ _id: id }).populate({
    path: "modules",
    populate: {
      path: "lessons",
    },
  });
  return result;
};

const updateCourse = async (id: string, courseData: TCourse) => {
  const result = await Course.findOneAndUpdate({ _id: id }, courseData, {
    new: true,
  });
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const courseServices = {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
};
