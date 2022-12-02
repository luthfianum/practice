const express = require("express");
const app = express();
const db = require("./db");
const passport = require("passport");
require("./passportConfig")(passport);

const PORT = 3000;

db.connect();

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data using the access token received
app.get(
  "/auth/google/callback",
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.redirect("/profile/");
  }
);

app.get("/profile",
  passport.authenticate('jwt', { session: false }), 
  (req, res, next) => {
    console.log(req);
    res.send("Welcome");
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});