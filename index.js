const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require("express-session");
const {
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	REDIS_URL,
	REDIS_PORT,
	SESSION_SECRET,
} = require("./config/config");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
	host: REDIS_URL,
	port: REDIS_PORT,
});

const port = 3000;

const connectWithRetry = () => {
	mongoose
		.connect(
			`${DB_NAME}://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}:27017/?authSource=admin`
		)
		.then(() => console.log("Successfully connected to db"))
		.catch((e) => {
			console.log(e);
			setTimeout(connectWithRetry, 5000);
		});
};
// connect to db
connectWithRetry();
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		// saveUninitialized: false,
		secret: SESSION_SECRET,
		cookie: {
			secure: false,
			resave: false,
			saveUninitialized: false,
			httpOnly: true,
			maxAge: 60000,
		},
	})
);
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
