import { Types } from "mongoose";

export type TLesson = {
  title: string;
  url: string;
  moduleId: Types.ObjectId;
};
