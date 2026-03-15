import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import * as listingController from '../controllers/listings.js';
import { redirectUrlFxn } from "../middleware.js";
import * as userController from "../controllers/user.js"

const router = express.Router();

router.get("/", wrapAsync(listingController.index));
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(redirectUrlFxn, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

export default router;