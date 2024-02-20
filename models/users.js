import { Schema, model } from "mongoose";
import {
  emailRegexp,
  nameRegexp,
  passwordRegexp,
  phoneRegexp,
} from "../constants/user-constants.js";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const userSchema = new Schema(
  {
    googleId: { type: String },
    facebookId: { type: String },
    firstName: {
      type: String,
      // match: nameRegexp,
      // required: [true, "First name is required"],
    },
    middleName: {
      type: String,
      match: nameRegexp,
      // required: [true, "Middle name is required"],
    },
    lastName: {
      type: String,
      // match: nameRegexp,
      // required: [true, "Last name is required"],
    },
    password: {
      type: String,
      // match: passwordRegexp,
      // required: [true, "Password is required"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      // required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpExpire: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findByIdAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findByIdAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
