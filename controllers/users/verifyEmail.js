import User from "../../models/users.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const verifyEmail = async (req, res) => {
  const { otp } = req.body;

  const user = await User.findOne({ otp });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.otpExpire < Date.now()) {
    throw HttpError(400, "OTP expired");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    otp: null,
    otpExpire: null,
  });

  res.json({
    message: "Verification successful",
  });
};

export default ctrlWrapper(verifyEmail);
