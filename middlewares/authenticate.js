import "dotenv/config";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw HttpError(401, "Not authorized");
  }
};

export default ctrlWrapper(authenticate);
