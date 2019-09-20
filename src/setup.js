import express from 'express';
import session from 'express-session';
import environment from 'dotenv';
import parser from 'body-parser';
import db from './datastore';
import routes from './routes';
import auth from './auth';


/*  SETUP
 *  This file has a method used to setup the
 *  server before it starts listening. */


function configure(server) {
  environment.config();
  db.setup(server.path);

  server.use(express.static('public'));
  server.use(parser.urlencoded({ extended: true }));
  server.use(parser.json());
  server.use(createSession());

  auth.setup(server);
  routes(server);
}

// Helper
function createSession() {
  return session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
  });
}

export default configure;
