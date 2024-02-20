import bcrypt from "bcryptjs";
import User from "../../models/users.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 2);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    otp,
    otpExpire,
  });

  const verifyEmail = {
    to: email,
    subject: "Код для підтвердження електронної пошти",
    html: `<p>Вітаємо! Ваш код для підтвердження електронної пошти: <span style="font-weight: 800;">${otp}</span>. <p>Увага! Код буде дійсним протягом двох хвилин.</p></p>`,
  };

  try {
    await sendEmail(verifyEmail);
  } catch (error) {
    console.log(error.message);
  }

  res.status(201).json({
    firstName: newUser.firstName,
    email: newUser.email,
  });
};

export default ctrlWrapper(register);
