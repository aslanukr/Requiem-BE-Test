import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/users.js";

const userDelete = async (req, res) => {
  const { _id } = req.user;

  // const deleteDate = new Date();
  // deleteDate.setDate(deleteDate.getDate() + 14);

  //REMOVE after test - 5 MINUTES DELAY DELETE TEST
  const deleteDate = new Date();
  deleteDate.setMinutes(deleteDate.getMinutes() + 5);
  //=========================

  const result = await User.findByIdAndUpdate(
    _id,
    { deleteAt: deleteDate },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "User with such ID was not found");
  }

  const { firstName, middleName, lastName, phone, email, verify, deleteAt } =
    result;

  res.json({
    firstName,
    middleName,
    lastName,
    phone,
    email,
    verify,
    deleteAt,
  });
};

export default ctrlWrapper(userDelete);
