import { Model } from "mongoose";

export type TStudent = {
  email: string;
  password: string;
  id: string;
  firstName: string;
  lastName: string;
  contact: string;
  isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent> {
  isStudentExists(email: string): Promise<TStudent | null>;
}
