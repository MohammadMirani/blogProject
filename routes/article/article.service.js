const multer = require("multer");
const generalTools = require("../../tools/general.tools");
const path = require("path");
const { all } = require("./article.controller");
const Article = require(path.join(__dirname, "../../models/Article.model"));

const createArticle = (req, res, next) => {
  let upload = generalTools.uploadArticle.single("articleImage");
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send("server error :(");
    } else if (err) {
      console.log(err.message);
      return res.status(404).send("Bad Request");
    } else {
      try {
        if (req.file) {
          image = "/images/article/" + req.file.filename;
        } else {
          image = "/images/article/";
        }
        let article = {
          title: req.body.title,
          description: req.body.description,
          body: req.body.body,
          author: req.session.user._id,
          image: image,
        };
        const newArticle = await new Article(article);
        saveArticle = await newArticle.save();
        res.redirect("/user/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const getAllArticle = async (req, res, next) => {
  try {
    let allArticle = await Article.find({}).populate("author");
    res.send(allArticle);
  } catch (err) {
    console.log(err.message);
  }
};
const getSingleArticlePage = async (req, res, next) => {
  try {
    let article = await Article.find({
      _id: req.params.articleId,
    }).populate("author", "lastname");
    res.render("./article/getSingleArticle", { article: article });
  } catch (err) {
    console.log(err.message);
  }
};
const getSingleArticle = async (req, res, next) => {
  try {
    let article = await Article.find({
      _id: req.params.articleId,
    }).populate("author", "lastname");
    res.send(article);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.articleId })
    .then((result) => {
      console.log(result, "deleting was successful");
      res.send("success");
    })
    .catch((err) => {
      console.log(err.message);
      res.send("error");
    });
};

const editArticle = (req, res, next) => {
  let upload = generalTools.uploadArticle.single("articleImage");
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send("server error :(");
    } else if (err) {
      console.log(err.message);
      return res.status(404).send("Bad Request");
    } else {
      let article = {};
      article.title = req.body.title;
      article.description = req.body.description;
      article.body = req.body.body;
      if (req.file) article.image = "/images/article/" + req.file.filename;
      console.log(article);
      Article.findOneAndUpdate({ _id: req.params.articleId }, { ...article }, {new: true})
        .then((article) => {
          console.log(article);
          res.redirect('/user/dashboard');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
};

module.exports = {
  createArticle,
  getAllArticle,
  getSingleArticlePage,
  getSingleArticle,
  deleteArticle,
  editArticle,
};
