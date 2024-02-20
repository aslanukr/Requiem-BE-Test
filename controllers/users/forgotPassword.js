import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import User from "../../models/users.js";

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 2);

  await User.findByIdAndUpdate(user._id, {
    otp,
    otpExpire,
  });

  const forgotPasswordEmail = {
    to: email,
    subject: "Код для зміни паролю",
    html: `<p>Вітаємо! Ваш код для зміни паролю: <span style="font-weight: 800;">${otp}</span>. <p>Увага! Код буде дійсним протягом двох хвилин.</p></p>`
  }

  await sendEmail(forgotPasswordEmail);

  res.json({
    message: "Email with OTP sent",
  })
};

export default ctrlWrapper(forgotPassword);
