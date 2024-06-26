import { Schema, model } from "mongoose";
import { TAdmin, AdminModel } from "./admin.interface";

const adminSchema = new Schema<TAdmin, AdminModel>(
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
adminSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
adminSchema.statics.isAdminExists = async function (email) {
  const existingUser = await Admin.findOne({ email });
  return existingUser;
};

// Query Middleware
adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.post("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  // next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
