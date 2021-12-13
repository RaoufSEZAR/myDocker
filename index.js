const express = require("express");
const mongoose = require("mongoose");
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = require("./config/config");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!sda"));

mongoose
	.connect(
		`${DB_NAME}://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}:27017/?authSource=admin`
	)
	.then(() => console.log("Successfully connected to db"))
	.catch((e) => console.log(e));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
