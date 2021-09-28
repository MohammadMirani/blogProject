const express = require("express");
const router = express.Router();
const path = require("path");
const {
    createArticle,
    getAllArticle,
    getSingleArticlePage,
    getSingleArticle,
    deleteArticle,
    editArticle
} = require('./article.service');
const generalTools = require("../../tools/general.tools");


router.post("/createArticle", generalTools.loginChecker, createArticle);
router.get("/getAllArticle", getAllArticle);
router.get("/getSingleArticlePage/:articleId", getSingleArticlePage);
router.get("/getSingleArticle/:articleId", getSingleArticle);
router.delete("/deleteArticle/:articleId", generalTools.loginChecker, deleteArticle);
router.post("/editArticle/:articleId", generalTools.loginChecker, editArticle);
// router.post("/editProfile", generalTools.loginChecker, editProfile);

module.exports = router;
