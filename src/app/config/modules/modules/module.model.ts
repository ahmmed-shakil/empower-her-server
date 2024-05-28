import { Schema, model } from "mongoose";
import { TModule } from "./modules.interface";

const moduleSchema = new Schema<TModule>(
  {
    title: {
      type: String,
      default: "NA",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
// Virtual for lessons in Module schema
moduleSchema.virtual("lessons", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "moduleId",
});
// Query Middleware
moduleSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

moduleSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

moduleSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Module = model<TModule>("Module", moduleSchema);
