const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { ValidationError } = require("express-validation");
const session = require("express-session");
const api = require("./routes/api");
const mongoose = require("mongoose");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Db connection
require("./config/mongoose.config");

// MiddleWare 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "user_sid",
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60, //60min
    },
  })
);


app.use((req, res, next) => {
  if ((req.cookies.user_sid ||req.cookies.user_token) && !req.session.user) {
    res.clearCookie("user_sid");
    res.clearCookie("user_token");
  }
  next();
});


app.use("/", api);

// Validation middleware
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err.details);
    return res.render("./auth/signup", {
      error: err.details.body[0],
      successful: false,
    });
  }
  return res.render("./auth/signup", {
    error: err.details.body[0],
    successful: false,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
