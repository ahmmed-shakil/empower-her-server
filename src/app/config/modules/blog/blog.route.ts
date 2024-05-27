import express from "express";
import { blogControllers } from "./blog.controller";

const router = express.Router();

router.post("/post-blog", blogControllers.createBlog);
router.get("/", blogControllers.getBlogs);
router.get("/:id", blogControllers.getBlogById);
router.delete("/:id", blogControllers.deleteBlog);

export const blogRouters = router;
