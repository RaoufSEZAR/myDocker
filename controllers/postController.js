const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res
			.status(200)
			.json({ status: "success", result: posts.length, data: { posts } });
	} catch (error) {
		res.status(500).json({ status: "failed", error });
	}
};

exports.getOnePost = async (req, res, next) => {
	const id = req.params.id;
	try {
		const post = await Post.findById(id);
		if (post) {
			res.status(200).json({ status: "success", data: { post } });
		} else {
			res
				.status(500)
				.json({ status: "failed", data: `Post with Id: ${id} is not found` });
		}
	} catch (error) {
		res.status(500).json({ status: "failed", error });
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const post = await Post.create(req.body);
		res.status(201).json({ status: "success", data: { post } });
	} catch (error) {
		res.status(500).json({ status: "failed", error });
	}
};

exports.updatePost = async (req, res, next) => {
	const id = req.params.id;
	try {
		const post = await Post.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ status: "success", data: { post } });
	} catch (error) {
		res.status(500).json({ status: "failed", error });
	}
};

exports.deletePost = async (req, res, next) => {
	const id = req.params.id;
	try {
		await Post.findByIdAndDelete(id);
		res.status(200).json({ status: "success" });
	} catch (error) {
		res.status(500).json({ status: "failed", error });
	}
};
