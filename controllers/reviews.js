import { Listing } from "../models/listing.js";
import Review from "../models/reviews.js";

export let newReview = async (request , response) => {
    let {id} = request.params;
    
    let listing = await Listing.findById(id);
    let review = new Review(request.body);
    review.author = request.user._id;
    await listing.reviews.push(review);

    await review.save();
    await listing.save();
    request.flash("success" , "New Review Created");

    response.redirect(`/listings/${listing._id}`);
};

export let destroyReview = async (request , response) => {
    let {id , reviewid} = request.params;

    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewid}});
    await Review.findByIdAndDelete(reviewid);
    request.flash("success" , "Review Deleted");

    response.redirect(`/listings/${id}`);
};