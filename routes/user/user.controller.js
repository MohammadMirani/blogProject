const express = require("express");
const router = express.Router();
const path = require("path");
const {
  dashboard,
  logout,
  avatarChange,
  editProfile,
  getSingleUser
} = require("./user.service");
const generalTools = require("../../tools/general.tools");


router.get("/dashboard", generalTools.loginChecker, dashboard);
router.get("/getSingleUser/:username", generalTools.loginChecker, getSingleUser);
router.get("/logout", generalTools.loginChecker, logout);
router.post("/avatar", generalTools.loginChecker, avatarChange);
router.post("/editProfile", generalTools.loginChecker, editProfile);

module.exports = router;
