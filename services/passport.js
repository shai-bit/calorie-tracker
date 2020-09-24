const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Creating a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Look for user with that cookies ID
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        name: profile.name.givenName,
        goal: 0,
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  'custom-login',
  new CustomStrategy(async (req, done) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return done(null, 'not-found');
    }
    const isValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isValid) {
      return done(null, 'invalid-pass');
    }
    return done(null, existingUser);
  })
);
