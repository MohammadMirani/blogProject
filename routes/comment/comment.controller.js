const express = require("express");
const router = express.Router();
const generalTools = require("../../tools/general.tools");
const { createComment } = require("./comment.service");


router.post("/createComment/:articleId", createComment);

module.exports = router;
