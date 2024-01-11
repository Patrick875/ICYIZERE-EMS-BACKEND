//jshint esversion:9
const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const randomStringGenerator = require("../utils/randomStringGenerator");
const { send } = require("../utils/sendEmail");
const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const sendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);
	const cookieOptions = {
		maxAge: 90 * 24 * 60 * 60 * 1000,
		httpOnly: process.env.NODE_ENV === "production" ? true : false,
		secure: process.env.NODE_ENV === "production" ? true : false,
		sameSite: "none",
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
	};
	res.cookie("token", token, cookieOptions);
	user.password = undefined;
	res.status(statusCode).json({
		status: "Success",
		token,
		user,
	});
};
exports.signup = async (req, res) => {
	const { email, firstName, lastName, password, tel, nationalId, department } =
		req.body;
	if (!email) {
		return res.status(400).json({
			message: "email is required ",
		});
	}
	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({
			email,
			firstName,
			lastName,
			tel,
			nationalId,
			department,
			password: hashedPassword,
		});
		return res.status(201).json({
			status: "success",
			message: "User created successfuly",
			user,
		});
	} catch (err) {
		console.log("err", err);
		return res.status(500).json({
			message: "error creating new user",
		});
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			status: "failed",
			message: "Provide both email and password",
		});
	}

	try {
		const user = await User.findOne({
			where: { email },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({
				status: "fail",
				message: "incorrect email or password",
			});
		}
		user.password = undefined;
		sendToken(user, 200, req, res);
	} catch (error) {
		console.log(error);
	}
};

exports.resetPassword = async (req, res) => {
	const { email } = req.body;

	// if (!oldPassword || !newPassword) {
	// 	return res.status(400).json({
	// 		status: "failed",
	// 		message: "provide both old and new password",
	// 	});
	// }

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({
				status: "success",
				message: "user not found",
			});
		}
		const newPassword = randomStringGenerator(8);
		const hashedPassword = await bcrypt.hash(newPassword, 12);
		await User.update({ password: hashedPassword }, { where: { email } });
		await send(
			{ userEmail: email, newpassword: newPassword },
			"Reset Password"
		);

		res.status(200).json({
			status: "success",
			message: "password updated successfuly",
		});
	} catch (error) {
		console.log("error", error);
	}
};
exports.getAllUser = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		return res.status(200).json({
			data: users,
		});
	} catch (error) {
		console.log(error);
	}
};
