const express = require("express");
const mongoose = require("mongoose");
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = require("./config/config");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
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

app.use(express.json());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
