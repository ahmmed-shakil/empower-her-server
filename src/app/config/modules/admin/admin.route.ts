import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.post("/", adminController.createAdmin);
router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getSingleAdmin);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export const adminRoutes = router;
