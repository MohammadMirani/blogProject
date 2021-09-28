const express = require("express");
const router = express.Router();
const { createUser, signup, signin, login , logout} = require("./auth.service");
const { validate } = require("express-validation");
const validator = require("./middleware/signup.validation");
const generalTools = require("../../tools/general.tools");

router.get("/signup", generalTools.sessionChecker, signup);
router.post("/signup", validate(validator.signup, {}, {}), createUser);
router.get("/signin", generalTools.sessionChecker, signin);
router.post("/signin", login);

module.exports = router;
