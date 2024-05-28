import express from "express";
import { courseControllers } from "./course.controller";

const router = express.Router();

router.post("/create-course", courseControllers.createCourse);
router.get("/", courseControllers.getCourses);
router.delete("/:id", courseControllers.deleteCourse);

export const courseRoutes = router;
