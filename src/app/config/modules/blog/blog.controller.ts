import { NextFunction, Request, Response } from "express";
import { blogServices } from "./blog.service";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogData = req.body;
    const result = await blogServices.createBlogIntoDB(blogData);
    res
      .status(200)
      .json({ success: true, message: "Blog createed", data: result });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await blogServices.getBlogs;
    res
      .status(200)
      .json({ success: true, message: "Blogs fetched", data: result });
  } catch (error) {
    next(error);
  }
};
const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await blogServices.getBlogById(id);
    res
      .status(200)
      .json({ success: true, message: "Blog fetched", data: result });
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await blogServices.deleteBlog(id);
    res
      .status(200)
      .json({ success: true, message: "Blogs deleted", data: result });
  } catch (error) {
    next(error);
  }
};

export const blogControllers = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
};
