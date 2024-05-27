import { TBlog } from "./blog.interface";
import { Blog } from "./blog.mode";

const createBlogIntoDB = async (blogData: TBlog) => {
  const result = await Blog.create(blogData);
  return result;
};

const getBlogs = async () => {
  const result = await Blog.find();
  return result;
};

const getBlogById = async (id: string) => {
  const result = await Blog.findOne({ _id: id });
  return result;
};

const deleteBlog = async (id: string) => {
  const result = await Blog.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getBlogs,
  getBlogById,
  deleteBlog,
};
