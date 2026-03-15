import { Listing } from "../models/listing.js";

export let index = async (request, response) => {
    let result = await Listing.find({});
    response.render("./listings/index.ejs", { allListing: result });
};

export let renderNewForm = (request, response) => {
    response.render("./listings/new.ejs");
};

export let createNewListing = async (request, response) => {
    let url = request.file.path;
    let filename = request.file.filename;
    let newListing = new Listing(request.body);
    newListing.image = { url, filename };
    newListing.owner = request.user._id;
    await newListing.save();
    request.flash("success", "New Listing Created");
    return response.redirect("/listings");
};

export let showListing = async (request, response) => {
    let { id } = request.params;
    let result = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!result) {
        request.flash("error", "This listing does not exist longer!!");
        return response.redirect("/listings");
    }
    response.render("./listings/show.ejs", { listDetail: result });
};

export let renderEditForm = async (request, response) => {
    let { id } = request.params;
    let findListing = await Listing.findById(id);
    if (!findListing) {
        request.flash("error", "This listing is no longer exists !!!");
        return response.redirect("/listings");
    }
    let originalImageUrl = findListing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");
    response.render("./listings/edit.ejs", { listing: findListing, originalImageUrl });
};

export let updateListing = async (request, response) => {
    let { id } = request.params;
    let listing = await Listing.findByIdAndUpdate(id, request.body, { runValidators: true });
    if (typeof request.file !== "undefined") {
        let url = request.file.path;
        let filename = request.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    request.flash("success", "Listing Updated");
    response.redirect(`/listings/${id}`);
};

export let destroyListing = async (request, response) => {
    let { id } = request.params;
    await Listing.findByIdAndDelete(id);
    request.flash("success", "Listing Deleted");
    response.redirect('/listings');
};

export let serachListing = async (request, response) => {
    let { country } = request.body;
    let listings = await Listing.find({ country: { $regex: new RegExp(country, "i") } });
    if (!listings || listings.length < 1) {
        listings = await Listing.find({ location: { $regex: new RegExp(country, "i") } });
    }
    if (!listings || listings.length < 1) {
        request.flash("error", "No Listing Related to this country");
        return response.redirect('/listings');
    }
    response.render("./listings/index.ejs", { allListing: listings });
};

export let filterListing = async (request, response) => {
    let { type } = request.params;
    response.send(type);
};