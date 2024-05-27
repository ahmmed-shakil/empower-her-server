import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdminIntoDB = async (adminData: TAdmin) => {
  if (await Admin.isAdminExists(adminData.email)) {
    throw new Error("Email already exists");
  }
  const response = await Admin.create(adminData);
  return response;
};

const geTAdminFromDB = async () => {
  const response = await Admin.find();
  return response;
};

const getSIngleAdminFromDB = async (id: string) => {
  const response = await Admin.findById({ _id: id });
  if (!response) {
    throw new Error("Admin not found");
  }
  return response;
};

const updateAdmin = async (id: string, adminData: TAdmin) => {
  if (await Admin.isAdminExists(adminData.email)) {
    throw new Error("This email already exists");
  }
  const result = await Admin.findOneAndUpdate({ _id: id }, adminData, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const response = await Admin.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  if (response) {
    return null;
  } else {
    throw new Error("Admin not found");
  }
};

export const adminServices = {
  createAdminIntoDB,
  geTAdminFromDB,
  getSIngleAdminFromDB,
  updateAdmin,
  deleteAdminFromDB,
};
