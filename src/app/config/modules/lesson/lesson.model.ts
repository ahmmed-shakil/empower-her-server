import { Schema, model } from "mongoose";
import { TLesson } from "./lesson.interface";

const lessonSchema = new Schema<TLesson>({
  title: {
    type: String,
    default: "NA",
  },
  url: {
    type: String,
    default: "NA",
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Query Middleware
lessonSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

lessonSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

lessonSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Lesson = model<TLesson>("Lesson", lessonSchema);
