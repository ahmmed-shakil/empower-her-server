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
  },
  { timestamps: true }
);

const Module = model<TModule>("Module", moduleSchema);
