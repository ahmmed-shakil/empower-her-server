import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Query Middleware
blogSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Blog = model<TBlog>("Blog", blogSchema);
