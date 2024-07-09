import express from "express";
import passport from "passport";
import {
  register,
  getCurrent,
  logout,
  updateUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  testingCron,
} from "../../controllers/users/index.js";
import schemas from "../../schemas/userSchema.js";
import { authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

router.post("/signup", validateBody(schemas.userSignupSchema), register);

router.post("/verify", validateBody(schemas.userOTPSchema), verifyEmail);

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/api/auth/signin/failed");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const { firstName, middleName, lastName, phone, email, _id } = user;

      return res.json({
        firstName,
        middleName,
        lastName,
        phone,
        email,
        _id,
      });
    });
  })(req, res, next);
});

// router.post(
//   "/signin",
//   passport.authenticate("local", {
//     failureRedirect: "/api/auth/signin/failed",
//     successRedirect: "/api/auth/current",
//     // successRedirect: "/api/auth/signin/success",
//   })
// );

// router.get("/signin/success", authenticate, (req, res) => {
//   if (req.user) {
//     res.json({
//       success: true,
//       message: "User has successfully authenticated",
//       user: req.user,
//     });
//   }
// });

router.get("/signin/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/api/auth/current");
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/api/auth/current",
    failureRedirect: "/signin/failed",
  })
);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.post(
  "/forgotPassword",
  validateBody(schemas.userEmailSchema),
  forgotPassword
);

router.patch(
  "/resetPassword",
  validateBody(schemas.userResetPasswordSchema),
  resetPassword
);

router.get("/changePassword", authenticate, changePassword);

router.get("/testingCron", testingCron);

//// TO DO
router.patch(
  "/user",
  authenticate,
  validateBody(schemas.userUpdateSchema),
  upload.single("document"),
  updateUser
);

export default router;
