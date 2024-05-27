import { Types } from "mongoose";

export type TModule = {
  title: string;
  courseId: Types.ObjectId;
};
