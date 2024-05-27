import { Schema, model } from "mongoose";
import { TLesson } from "./lesson.interface";

const lessonSchema = new Schema<TLesson>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
  },
});

export const Lesson = model<TLesson>("Lesson", lessonSchema);
