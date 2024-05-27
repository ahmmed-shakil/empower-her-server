import { Model } from "mongoose";

export type TAdmin = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(email: string): Promise<TAdmin | null>;
}
