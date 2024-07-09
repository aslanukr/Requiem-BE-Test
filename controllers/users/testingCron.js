import { ctrlWrapper } from "../../decorators/index.js";

const testingCron = (req, res) => {
  res.json({
    message: "Cron successfull!",
  });
};

export default ctrlWrapper(testingCron);
