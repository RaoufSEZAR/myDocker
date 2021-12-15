require("dotenv").config();

module.exports = {
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	REDIS_URL: process.env.REDIS_URL || "redis",
	REDIS_PORT: process.env.REDIS_PORT || 6379,
	SESSION_SECRET: process.env.SESSION_SECRET,
};
