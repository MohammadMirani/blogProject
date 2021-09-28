const path = require("path");
const User = require(path.join(__dirname, "../../models/User.model"));
const Article = require(path.join(__dirname, "../../models/Article.model"));
const multer = require("multer");
const fs = require("fs");

const dashboard = (req, res, next) => {
  let user = req.session.user;
  Article.find({ author: { _id: user._id } })
    .then((articles) => {
      console.log(articles);
      return res.render("./user/dashboard", {
        user: user,
        articles: articles,
      });
    })
    .catch((err) => {
      res.send(err.message);
    });
};

const logout = (req, res, next) => {
  req.session.user = null;
  console.log(req.session.user);
  return res.redirect("/auth/signin");
};
const avatarChange = (req, res, next) => {
  let upload = generalTools.uploadAvatar.single("avatar");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.render("./user/dashboard", { err: "server error" });
    } else if (err) {
      return res.render("./user/dashboard", { err: "server error" });
    }

    if (req.file) {
      if (req.session.user.avatar !== "/images/avatar/avatar.png") {
        fs.unlink(
          path.join(__dirname, "../../public/", req.session.user.avatar),
          (err) => {
            if (err) console.log("error");
          }
        );
      }

      User.findOneAndUpdate(
        { username: req.session.user.username },
        { avatar: `/images/avatar/${req.file.filename}` },
        (err, user) => {
          if (err) return res.redirect("/user/dashboard");
          req.session.user.avatar = `/images/avatar/${req.file.filename}`;
          return res.redirect("/user/dashboard");
        }
      );
    } else {
      return res.redirect("/user/dashboard");
    }
  });
};

const editProfile = async (req, res, next) => {
  try {
    let editedUser = req.body;
    let updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { ...editedUser },
      { new: true }
    );
    req.session.user = updatedUser;
    return res.send("success");
  } catch (err) {
    res.send(err.message);
  }
};

const getSingleUser = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("error");
    });
};

module.exports = {
  dashboard,
  logout,
  avatarChange,
  editProfile,
  getSingleUser,
};
