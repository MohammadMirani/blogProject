const express = require("express");
const router = express.Router();
const Articles = require("../models/Article.model");
const authRout = require("./auth/auth.controller");
const userRoute = require("./user/user.controller");
const commentRoute = require("./comment/comment.controller");
const articleRoute = require("./article/article.controller");

router.get("/", (req, res, next) => {
  Articles.find({})
    .then((articles) => {
      res.render("home.ejs", { articles: articles });
    })
    .catch((err) => {
      res.send("error");
    });
});

router.use("/auth", authRout);
router.use("/user", userRoute);
router.use("/article", articleRoute);
router.use("/comment", commentRoute);

module.exports = router;
