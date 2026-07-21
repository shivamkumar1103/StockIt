import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/verifyEmail/:token").get(authController.verifyEmail);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router
  .route("/resendVerificationEmail")
  .post(authController.resendVerificationEmail);

router.use(authController.protect);

router.route("/updateMyPassword").patch(authController.updatePassword);
router.route("/logout").post(authController.logout);
router.route("/me").get(authController.getMe);

export default router;
