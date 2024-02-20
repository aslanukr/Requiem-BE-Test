import { ctrlWrapper } from "../../decorators/index.js";
import User from "../../models/users.js";

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  const { firstName, middleName, lastName, phone } = result;

  res.json({
    firstName,
    middleName,
    lastName,
    phone,
  });
};

export default ctrlWrapper(updateUser);
