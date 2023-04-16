const User = require("../models/user.model");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy( async (username, password, done) => {
        try {
            const user = await User.findOne({username: username});
            if (!user) {
                return done(null, false, {message: "Incorrect User"});
            }
            if(!bcrypt.compare(password, user.password)){

            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// create a session id
// whenever we login it create user id inside session
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    try {
        const user = User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});