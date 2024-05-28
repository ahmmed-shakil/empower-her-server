import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual for modules in Course schema
courseSchema.virtual("modules", {
  ref: "Module",
  localField: "_id",
  foreignField: "courseId",
});

// Query Middleware
courseSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Course = model<TCourse>("Course", courseSchema);
