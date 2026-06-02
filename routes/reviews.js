import express, { response } from "express";
import wrapAsync from '../utils/wrapAsync.js';
import Review from '../models/reviews.js';
import { Listing } from '../models/listing.js';
import { validateReview } from '../middleware.js';
import { isLoggedIn } from "../middleware.js";
import { isAuthor } from "../middleware.js";
import * as reviewController from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

//  TO ADD THE REVIEW TO PARTICULAR POST
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.newReview));

//  TO SERVE THE REVIEW EDIT FORM
router.get("/:reviewid/edit", isLoggedIn, isAuthor, wrapAsync(reviewController.editReview));

router.route("/:reviewid")
    //  TO UPDATE THE REVIEW
    .put(isLoggedIn, isAuthor, wrapAsync(reviewController.updateReview))

    //  TO DELETE THE PARTICULAR COMMENT
    .delete(isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

export default router;