const Comment = require("../../models/Comment.model");

const createComment = async (req, res, next) => {
  let comment = {};
  comment.text = req.body.text;
  comment.author = req.session.user._id;
  comment.article = req.params.articleId;

  new Comment({ ...comment })
    .save()
    .then((comment) => {
      console.log(comment);
      res.send(comment);
    })
    .catch((err) => {
      console.log(err.message);
    });

};

module.exports = { createComment };
