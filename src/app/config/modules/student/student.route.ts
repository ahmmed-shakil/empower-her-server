import { Router } from "express";
import { studentController } from "./student.controller";

const router = Router();

// Define the routes and map them to the controller functions
router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getSingleStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export const studentRoutes = router;
