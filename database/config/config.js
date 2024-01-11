require("dotenv").config();

module.exports = {
	development: {
		url: process.env.ONLINE_DATABASE_URL,
		dialect: "postgres",
	},
};
