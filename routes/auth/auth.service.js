const path = require("path");
const User = require(path.join(__dirname, "../../models/User.model"));
const bcrypt = require("bcrypt");
const essentialItems = [
  "username",
  "password",
  "phonenumber",
  "email",
  "birthdate",
  "sex",
  "firstname",
  "lastname",
];

// Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "522637234291-g655q4eovda9vgpbnna2fmg4im5a27vl.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const signup = (req, res, next) => {
  res.render("./auth/signup.ejs", { error: null, successful: false });
};

const createUser = async (req, res, next) => {
  const reqKeys = Object.keys(req.body);
  const checkElement = essentialItems.every((el) => {
    return reqKeys.includes(el);
  });
  if (checkElement) {
    User.findOne({ username: req.body.username }, (err, existUser) => {
      if (err) return res.status(500).send(err.message);
      if (existUser)
        return res.render("./auth/signup", {
          error: "This username already was taken",
          successful: false,
        });
      const newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) {
          return res.render("./auth/signup", {
            error: err.message,
            successful: false,
          });
        }

        return res.render("./auth/signup", { error: null, successful: true });
      });
    });
  } else {
    return res.render("./auth/signup", {
      error: "empty fields!!!",
      successful: false,
    });
  }
};

const signin = (req, res, next) => {
  res.render("./auth/signin", { err: null, successful: null });
};

const login = (req, res, next) => {
  if (req.body.idToken) {
    let token = req.body.idToken;
    let user = {};
    const userId = "122";
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      // userId = payload["sub"];
      user.username = payload.sub;
      user.firstname = payload.given_name;
      user.lastname = payload.family_name;
      user.email = payload.email;
      user.avatar = payload.picture;
      req.session.user = user;
      // req.session.user = payload;
    }

    verify()
      .then(async () => {
        try {
          existUser = await User.findOne({ username: user.username });
          if (existUser) {
            req.session.user = existUser;
            res.cookie("user_token", token);
            return res.send("success");
          }
          let newUser = await new User(user);
          await newUser.save();
          res.cookie("user_token", token);
          return res.send("success");
        } catch (err) {
          console.log(err);
          return res.render("./auth/signin", { err: err, successful: null });
        }
      })
      .catch(console.error);
  } else {
    User.findOne({ username: req.body.username }, (err, existUser) => {
      if (err)
        return res.render("./auth/signin", { err: err, successful: null });
      if (!existUser)
        return res.render("./auth/signin", {
          err: "username or password is incorrect",
          successful: null,
        });

      bcrypt.compare(req.body.password, existUser.password, (err, isMatch) => {
        if (err)
          return res.render("./auth/signin", { err: err, successful: null });
        if (!isMatch) {
          return res.render("./auth/signin", {
            err: "username or password is incorrect",
            successful: null,
          });
        }
        req.session.user = existUser;
        return res.render("./auth/signin", { err: null, successful: true });
      });
    });
  }
};

const logout = (req, res, next) => {
  req.session = null;
  res.clearCookie("user_token");
  res.clearCookie("user_sid");

  res.redirect("/auth/signin", { err: null, successful: null });
};

module.exports = { createUser, signup, signin, login, logout };
