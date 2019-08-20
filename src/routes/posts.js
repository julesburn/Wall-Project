const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController")

router.get("/posts", postController.index);
router.get("/posts/new", postController.new);
router.post("/posts/create", postController.create);

module.exports = router;