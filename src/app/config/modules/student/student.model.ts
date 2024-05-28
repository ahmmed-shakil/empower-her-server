import { Schema, model } from "mongoose";
import { TStudent, StudentModel } from "./student.interface";

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

studentSchema.statics.isStudentExists = async function (email) {
  console.log("🚀 ~ email:", email);
  const existingUser = await Student.findOne({ email });
  console.log("🚀 ~ existingUser:", existingUser);
  return existingUser;
};

studentSchema.pre(`save`, async function (next) {
  const year = new Date().getFullYear();
  const serial = (await Student.find())?.length + 1;
  this.id = `${year}${serial}`;
});
// Query Middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.post("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  // next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
