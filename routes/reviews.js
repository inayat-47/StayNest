import express from "express";
import wrapAsync from '../utils/wrapAsync.js';
import Review from '../models/reviews.js';
import {Listing} from '../models/listing.js';
import {validateReview} from '../middleware.js';
import { isLoggedIn } from "../middleware.js";
import { isAuthor } from "../middleware.js";
import * as reviewController from "../controllers/reviews.js";

const router = express.Router({mergeParams: true});

//  TO ADD THE REVIEW TO PARTICULAR POST
router.post("/" , isLoggedIn , validateReview , wrapAsync(reviewController.newReview));

//  TO DELETE THE PARTICULAR COMMENT
router.delete("/:reviewid" , isLoggedIn , isAuthor , wrapAsync(reviewController.destroyReview));

export default router;