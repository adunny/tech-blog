const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

// get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create comment
router.post("/", (req, res) => {
  Comment.create({
    comment_content: req.body.comment_content,
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  })
    .then((newComment) => res.json(newComment))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
