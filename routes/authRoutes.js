const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = mongoose.model('users');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.post('/api/create_user', async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    // User already exists
    if (existingUser) {
      return res.send('user-exists');
    }
    // Hash password and create User
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }).save();
    });
    return res.send('user-created');
  });

  app.post(
    '/api/login',
    passport.authenticate('custom-login', { session: false }),
    (req, res) => {
      if (req.user === 'no-user' || req.user === 'invalid-pass') {
        return res.send(req.user);
      }
      req.login(req.user, () => {
        return res.send('login-success');
      });
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
