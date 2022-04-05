const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_content", "user_id", "post_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((post) => res.json(post))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_content", "user_id", "post_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: "Invalid post id" });
        return;
      }
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.body.user_id,
  })
    .then((newPost) => res.json(newPost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
