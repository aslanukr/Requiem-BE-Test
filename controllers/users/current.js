import { ctrlWrapper } from "../../decorators/index.js";

const getCurrent = (req, res) => {
  const { firstName, middleName, lastName, phone, email, _id } = req.user;
  console.log(req.user);
  res.json({
    firstName,
    middleName,
    lastName,
    phone,
    email,
    _id,
  });
};

export default ctrlWrapper(getCurrent);
