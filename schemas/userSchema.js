import Joi from "joi";
import {
  emailRegexp,
  passwordRegexp,
  nameRegexp,
  phoneRegexp,
} from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  firstName: Joi.string().pattern(nameRegexp).required().messages({
    "string.empty": "firstName is required",
    "string.pattern.base": "Invalid firstName format",
    "any.required": "firstName is required",
  }),
  middleName: Joi.string().pattern(nameRegexp).required().messages({
    "string.empty": "middleName is required",
    "string.pattern.base": "Invalid middleName format",
    "any.required": "middleName is required",
  }),
  lastName: Joi.string().pattern(nameRegexp).required().messages({
    "string.empty": "lastName is required",
    "string.pattern.base": "Invalid lastName format",
    "any.required": "lastName is required",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot be longer than 16 characters",
      "string.pattern.base":
        "Password must include at least 1 uppercase and 1 digit",
      "any.required": "Password is required",
    }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Invalid phone number format",
    "any.required": "Phone number is required",
  }),
});

const userSigninSchema = Joi.object({
  password: Joi.string().min(6).max(16).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot be longer than 16 characters",
    "any.required": "Password is required",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
});

const userUpdateSchema = Joi.object({
  firstName: Joi.string().pattern(nameRegexp).messages({
    "string.empty": "firstName is required",
    "string.pattern.base": "Invalid firstName format",
  }),
  middleName: Joi.string().pattern(nameRegexp).messages({
    "string.empty": "middleName is required",
    "string.pattern.base": "Invalid middleName format",
  }),
  lastName: Joi.string().pattern(nameRegexp).messages({
    "string.empty": "lastName is required",
    "string.pattern.base": "Invalid lastName format",
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.empty": "Phone is required",
    "string.pattern.base": "Invalid phone number format",
  }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
});

const userResetPasswordSchema = Joi.object({
  otp: Joi.number().required().messages({
    "string.empty": "OTP is required",
    "string.pattern.base": "Invalid OTP format",
    "any.required": "OTP is required",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot be longer than 16 characters",
      "string.pattern.base":
        "Password must include at least 1 uppercase and 1 digit",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.ref("password"),
});

const userOTPSchema = Joi.object({
  otp: Joi.number().required().messages({
    "string.empty": "OTP is required",
    "string.pattern.base": "Invalid OTP format",
    "any.required": "OTP is required",
  }),
})

export default {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
  userEmailSchema,
  userResetPasswordSchema,
  userOTPSchema,
};
