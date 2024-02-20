import bcrypt from "bcryptjs";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/users.js";

const resetPassword = async (req, res) => {
  const { password, confirmPassword, otp } = req.body;

  const user = await User.findOne({ otp });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (password !== confirmPassword) {
    throw HttpError(400, "Passwords are not equal");
  }
  if (user.otpExpire < Date.now()) {
    throw HttpError(400, "OTP expired");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
    otp: null,
    otpExpire: null,
  });

  res.json({
    message: "Password reset successful",
  });
};

export default ctrlWrapper(resetPassword);
