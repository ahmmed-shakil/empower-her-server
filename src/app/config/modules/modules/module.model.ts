import { Schema, model } from "mongoose";
import { TModule } from "./modules.interface";

const moduleSchema = new Schema<TModule>(
  {
    title: {
      type: String,
      required: true,
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
  { timestamps: true }
);

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
