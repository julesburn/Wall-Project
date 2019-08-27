const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const postController = require("../controllers/postController")

router.get("/posts", postController.index);

router.get("/posts/new", postController.new);

router.post("/posts/create",
helper.ensureAuthenticated,
postController.create);

router.get("/posts/:id", postController.show);

router.post("/posts/:id/destroy", helper.ensureAuthenticated,
postController.destroy);

router.get("/posts/:id/edit", helper.ensureAuthenticated,
postController.edit);

router.post("/posts/:id/update", helper.ensureAuthenticated,
postController.update);

module.exports = router;