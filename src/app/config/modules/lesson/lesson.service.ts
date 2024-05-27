import { TLesson } from "./lesson.interface";
import { Lesson } from "./lesson.model";

const createLesson = async (lessonData: TLesson) => {
  const result = await Lesson.create(lessonData);
  return result;
};

const getLessons = async () => {
  const result = await Lesson.find();
  return result;
};

const getLessonById = async (id: string) => {
  const result = await Lesson.findOne({ _id: id });
  return result;
};

const updateLesson = async (id: string, lessonData: TLesson) => {
  const result = await Lesson.findOneAndUpdate({ _id: id }, lessonData, {
    new: true,
  });
  return result;
};

const deleteLesson = async (id: string) => {
  const result = await Lesson.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const lessonServices = {
  createLesson,
  getLessonById,
  getLessons,
  updateLesson,
  deleteLesson,
};
