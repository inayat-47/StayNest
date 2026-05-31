import User from "../models/user.js";

export let renderSignupForm = (request, response) => {
    response.render("user/signup.ejs");
};

export let signup = async (request, response) => {
    try {
        let { username, email, password } = request.body;
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);
        request.login(registeredUser ,(error) => {
            if(error)
                return next();
            request.flash("success", "Sign Up Successful");
            response.redirect("/listings");
        });
    } catch (error) {
        request.flash("error", "Username already Exists!!");
        response.redirect("/signup");
    }
};

export let renderLoginForm = (request, response) => {
    response.render("user/login.ejs");
};

export let login = async (request, response) => {
    request.flash("success", "Welcome back to StayNest");
    let url = response.locals.redirectUrl || "/listings";
    response.redirect(url);
};

export let logout = (request , response , next) => {
    request.logout((error) => {
        if(error){
            return next();
        }
        request.flash("success" , "You are logged out!!!");
        response.redirect("/listings");
    })
};