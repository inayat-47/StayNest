import { Listing } from "./models/listing.js";
import {BackendError} from './utils/BackendError.js';
import {listingSchema , reviewSchema} from './schema.js';
import Review from "./models/reviews.js";

export let isLoggedIn = (request , response , next) => {
    if(!request.isAuthenticated()){
        request.session.redirectUrl = request.originalUrl;
        request.flash("error" , "You must be logged in to your account");
        return response.redirect("/login");
    }
    return next();
};

export let redirectUrlFxn = (request , response , next) => {
    if(request.session.redirectUrl){
        response.locals.redirectUrl = request.session.redirectUrl;
    }
    next();
};

export let isOwner = async(request  , response , next) => {
    let {id} = request.params;
    let result = await Listing.findById(id);
    if(!response.locals.currentUser._id.equals(result.owner._id)){
        request.flash("error" , "You not have permission to update");
        return response.redirect(`/listings/${id}`);
    }
    next();
};

export let validateListing = (request , response , next) => {
    let {error} = listingSchema.validate(request.body);
    if(error){
        throw new BackendError(400 , error.message);
    }
    next();
};

export let validateReview = (request , response , next) => {
    let {error} = reviewSchema.validate(request.body);
    if(error)
        throw new BackendError(400 , error.message);
    next();
};

export let isAuthor = async(request  , response , next) => {
    let {id , reviewid} = request.params;
    let result = await Review.findById(reviewid);
    if(!response.locals.currentUser._id.equals(result.author)){
        request.flash("error" , "You not have permission to Delete");
        return response.redirect(`/listings/${id}`);
    }
    next();
};