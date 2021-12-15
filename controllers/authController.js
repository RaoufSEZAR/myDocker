const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	try {
		const newUser = await User.create({
			username,
			password: hashedPassword,
		});
		res.status(201).json({ status: "success", data: { user: newUser } });
	} catch (error) {
		res.status(500).json({ status: "failed", error: error });
	}
};

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(400)
				.json({ status: "failed", message: "user not found" });
		}
		const isCorrect = await bcrypt.compare(password, user.password);
		if (isCorrect) {
			return res.status(200).json({ status: "success" });
		} else {
			return res
				.status(400)
				.json({ status: "failed", message: "incorrect username or password" });
		}
	} catch (error) {
		res.status(500).json({ status: "failed", error: error });
	}
};
