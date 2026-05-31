import mongoose from "mongoose";
import {sampleListings as originalListings} from "./data.js";
import { Listing } from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/staynest";
main().then((result) => {
    console.log("Database Connection Successful");
}) .catch(error => console.log(error));
async function main() {
    await mongoose.connect(MONGO_URL);
}

let initDB = async () => {
    await Listing.deleteMany({ });
    let sampleListings = originalListings.map((listing) => ({...listing , owner: "68bc9088d76638249d70d784"}));
    await Listing.insertMany(sampleListings);
    console.log(sampleListings);
}

initDB();