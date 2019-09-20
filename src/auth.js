import passport from 'passport';
import local from 'passport-local';
import connect from 'connect-ensure-login';
import error from "./errors";
import db from './datastore';



/*  AUTH
 *  Middlewares to handle authentication
 *  and authorisation for the api. */


// Setup passport
function setup(app) {
  passport.use(new local.Strategy(verify));
  passport.deserializeUser(db.users().deserialise);
  passport.serializeUser(db.users().serialise);
  app.use(passport.initialize());
  app.use(passport.session());
}

// Middleware to handle login
function login() {
  return (req, res, next) => {
    passport.authenticate('local',
      handleLogin(req, res, next)
    )(req, res, next);
  };
}

// Ensures user is authenticated
function check() {
  return connect.ensureLoggedIn();
}

// Ensures user has the given permission
function can(permission) {
  return (req, res, next) => {
    let user = req.user;
    if (user && permission(user)) {
      next();
    } else {
      error.forbidden(res);
    }
  }
}

// Helper
function verify(email, password, next) {
 db.users().findOne({ email: email }, (err, user) => {
   if (!err && user && user.pass == password) {
     return next(null, user);
   }
   return next(err);
 });
}

// Helper
function handleLogin(req, res, next) {
  return (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return error.invalidLogin(res) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(
        req.session.returnTo
      );
    });
  };
}

export default {
  setup,
  login,
  check,
  can
};
