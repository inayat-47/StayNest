import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import { BackendError } from './utils/BackendError.js';
import listingsRouter from './routes/listing.js';
import reviewsRouter from './routes/reviews.js';
import userRouter from './routes/user.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import passport, { Passport } from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';
import { error } from 'console';

const port = 5500;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.ATLAS_DB_URL;
const localDbUrl = "mongodb://127.0.0.1:27017/staynest";

main().then((result) => {
    console.log("Database Connection Successful");
}).catch(error => console.log(error));
async function main() {
    // await mongoose.connect(localDbUrl);
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in Mongo Session Store", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((request, response, next) => {
    response.locals.error = request.flash("error");
    response.locals.success = request.flash("success");
    response.locals.currentUser = request.user;
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.all(/.*/, (request, response, next) => {
    next(new BackendError(404, "Page Not Found !!!"));
});

app.use((error, request, response, next) => {
    let { status = 500, message = "Internal Server Error" } = error;
    response.status(status).render("error.ejs", { message });
    // response.render(error);
});

app.listen(port, () => {
    console.log("http://localhost:5500/listings");
});