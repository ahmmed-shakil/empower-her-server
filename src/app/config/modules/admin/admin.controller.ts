import { Request, Response, NextFunction } from "express";
import { adminServices } from "./admin.service";

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminData = req.body;
    const newAdmin = await adminServices.createAdminIntoDB(adminData);
    console.log("🚀 ~ newAdmin:", newAdmin);
    res
      .status(201)
      .json({ success: true, message: "Admin created", data: newAdmin });
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await adminServices.geTAdminFromDB();
    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
};

export const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const admin = await adminServices.getSIngleAdminFromDB(id);
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const adminData = req.body;
    const updatedAdmin = await adminServices.updateAdmin(id, adminData);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await adminServices.deleteAdminFromDB(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await adminServices.loginAdmin(email, password);
    res
      .status(200)
      .json({ success: true, message: "Login successful", data: result });
  } catch (error) {
    next(error);
  }
};
export const adminController = {
  createAdmin,
  getAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
