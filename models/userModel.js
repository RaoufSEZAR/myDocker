const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "User must have a username"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "User must have password"],
	},
});
module.exports = mongoose.model("User", UserSchema);
