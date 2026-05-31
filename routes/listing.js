import express from "express";
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn, isOwner, validateListing } from '../middleware.js';
import * as listingController from '../controllers/listings.js';
import multer from "multer";
import { storage } from "../cloudConfig.js";

const upload = multer({ storage });
const router = express.Router();


router.route("/")
    //  TO DISPLAY ALL THE LISTING
    .get(wrapAsync(listingController.index))

    //  TO POST THE CREATED LISTING
    .post(isLoggedIn, validateListing, upload.single('image'), wrapAsync(listingController.createNewListing));

//  TO SERVE THE FORM FOR CREATING THE LISTING
router.get("/new", isLoggedIn, listingController.renderNewForm);

//  TO DISPLAY THE FORM TO EDIT THE LISTING
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router.post("/country", wrapAsync(listingController.serachListing));

router.route("/filter/:type")
    .get(wrapAsync(listingController.filterListing));

router.route("/:id")

    //  TO DISPLAY THE UPDATED LISTING
    .put(isLoggedIn, isOwner, validateListing, upload.single('image'), wrapAsync(listingController.updateListing))

    //  TO SHOW THE LISTING IN DETAIL

    .get(wrapAsync(listingController.showListing))

    //  TO DELETE THE LISTING
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

export default router;