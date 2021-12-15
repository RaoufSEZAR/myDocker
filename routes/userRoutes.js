const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
// .post(postController.createPost);

// router
// 	.route("/:id")
// 	.get(postController.getOnePost)
// 	.patch(postController.updatePost)
// 	.delete(postController.deletePost);

module.exports = router;
