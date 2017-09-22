const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

//Google OAuth
passport.use(new GoogleStrategy({

    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                //Record already available in database
                done(null, existingUser);
            }
            else {
                //Record not available in database, push new record into database
                new User({ googleId: profile.id }).save().then(user => { done(null, user) });
            }
        })
}));

//Facebook OAuth
passport.use(new FacebookStrategy({

    clientID: keys.facebookClienID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',

}, (accessToken) => {

    console.log("Token is: " + accessToken);
    //console.log("Profile is: " + profile);

}));
