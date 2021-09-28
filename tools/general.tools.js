generalTools = {};
const multer = require("multer");
const path = require("path");

generalTools.sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    return res.redirect("/user/dashboard");
  }
  next();
};

generalTools.loginChecker = (req, res, next) => {
  if (!req.session.user || !req.cookies.user_sid) {
    return res.redirect("/auth/signin");
  }
  next();
};

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.join(__dirname, "../public/images/avatar")));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.session.user.username + "-" + Date.now() + "-" + file.originalname
    );
  },
});

generalTools.uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image type"), false);
    }
  },
});

const articleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(path.join(__dirname, "../public/images/article")));
    cb(null, path.join(path.join(__dirname, "../public/images/article")));
  },
  filename: function (req, file, cb) {
    cb(
      null,
       Date.now() + "-" + file.originalname
    );
  },
});

generalTools.uploadArticle = multer({
  storage: articleStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image type"), false);
    }
  },
});

module.exports = generalTools;
