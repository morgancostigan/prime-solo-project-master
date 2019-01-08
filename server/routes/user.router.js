const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const userzip = req.body.userzip;
  const avatar_id = req.body.avatar_id;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const isBrewer = req.body.isBrewer;
  const isAdmin = req.body.isAdmin;


  const queryText = `INSERT INTO "user" ("username", "userzip", "avatar_id", "email", "password", "isBrewer", "isAdmin") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool.query(queryText, [username, userzip, avatar_id, email, password, isBrewer, isAdmin])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles POST request with new BREWERY data
router.post('/registerBrewery', (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const website = req.body.website;
  const logo_url = req.body.logo_url;
  const bio = req.body.bio;
  const user = req.body.user;


  const queryText = `WITH breweryInsert AS (
INSERT INTO "brewery" ("name", "address", "city", "state", "zip", "website", "logo_url", "bio") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING "id")
UPDATE "user" SET "brewery_id" = (SELECT "id" FROM breweryInsert) WHERE "id" = $9`;
  pool.query(queryText, [name, address, city, state, zip, website, logo_url, bio, user])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
