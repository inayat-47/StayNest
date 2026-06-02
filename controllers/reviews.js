import { Listing } from "../models/listing.js";
import Review from "../models/reviews.js";

export let newReview = async (request, response) => {
    let { id } = request.params;
    console.log(id);

    let listing = await Listing.findById(id);
    let review = new Review(request.body);
    review.author = request.user._id;
    await listing.reviews.push(review);

    await review.save();
    await listing.save();
    request.flash("success", "New Review Created");

    response.redirect(`/listings/${listing._id}`);
};

export let editReview = async (request, response) => {
    let { id, reviewid } = request.params;
    let findReview = await Review.findById(reviewid);
    let findListing = await Listing.findById(id);
    if (!findReview) {
        request.flash("error", "This listing is no longer exists !!!");
        return response.redirect("/listings");
    }
    console.log(findReview);
    response.render("./reviews/edit.ejs", { review: findReview, listing: findListing });
};

export let updateReview = async (request, response) => {
    let { id, reviewid } = request.params;
    let findReview = await Review.findByIdAndUpdate(reviewid, request.body, { runValidators: true });
    findReview.createdAt = Date();
    ++findReview.__v;
    await findReview.save();
    request.flash("success", "Review Updated");
    response.redirect(`/listings/${id}`);
}

export let destroyReview = async (request, response) => {
    let { id, reviewid } = request.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    request.flash("success", "Review Deleted");

    response.redirect(`/listings/${id}`);
};