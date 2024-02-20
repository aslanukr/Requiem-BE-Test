import { ctrlWrapper } from "../../decorators/index.js";
import { sendEmail } from "../../helpers/index.js";
import User from "../../models/users.js";

const changePassword = async (req, res) => {
    const user = req.user;

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpire = new Date();
    otpExpire.setMinutes(otpExpire.getMinutes() + 2);
  
    await User.findByIdAndUpdate(user._id, {
      otp,
      otpExpire,
    });

    const changePasswordEmail = {
        to: user.email,
        subject: "Код для зміни паролю",
        html: `<p>Вітаємо! Ваш код для зміни паролю: <span style="font-weight: 800;">${otp}</span>. <p>Увага! Код буде дійсним протягом двох хвилин.</p></p>`
      }
    
      await sendEmail(changePasswordEmail);

      res.json({
        message: "Email with OTP sent",
      })
}

export default ctrlWrapper(changePassword);