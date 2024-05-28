import { TModule } from "./modules.interface";
import { Module } from "./module.model";

const createModule = async (moduleData: TModule) => {
  console.log("🚀 ~ createModule ~ moduleData:", moduleData);
  const result = await Module.create(moduleData);
  return result;
};

const getModules = async () => {
  const result = await Module.find();
  return result; // Adding return here to be consistent
};

const getModuleById = async (id: string) => {
  const result = await Module.findOne({ _id: id });
  return result; // Adding return here to be consistent
};

const updateModule = async (id: string, moduleData: TModule) => {
  const result = await Module.findOneAndUpdate({ _id: id }, moduleData, {
    new: true,
  });
  return result;
};

const deleteModule = async (id: string) => {
  const result = await Module.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const moduleServices = {
  createModule,
  getModuleById,
  getModules,
  updateModule,
  deleteModule,
};
