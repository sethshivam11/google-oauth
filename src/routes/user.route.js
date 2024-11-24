import { Router } from "express";
import passport from "passport";
import {
  getUser,
  handleLogout,
  handleSocialLogin,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    console.log("Google login route");
    res.send("Google login route");
  }
);

router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    handleSocialLogin
  );

router.route("/auth/user").get(getUser);

router.route("/auth/logout").get(handleLogout);

export default router;
