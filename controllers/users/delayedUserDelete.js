import User from "../models/users.js";

import { ctrlWrapper } from "../../decorators/index.js";

export const delayedUserDelete = async () => {
  const now = new Date();
  const users = await User.find({ deleteAt: { $lte: now } });

  for (const user of users) {
    const { _id } = user;

    await User.findByIdAndDelete(_id);
  }
};

export default ctrlWrapper(delayedUserDelete);
