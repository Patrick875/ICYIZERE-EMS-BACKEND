const nodemailer = require("nodemailer");

const config = {
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.RESET_PASSWORD_EMAIL,
		pass: process.env.RESET_PASSWORD_PASSWORD,
	},
};

const resetTemplate = (newpassword) => {
	return `<!DOCTYPE html>
<html lang="en">
    <style>
    h1{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.2em;
        margin-top:1.2em;
    }
    .ignore{
        font-weight:bold;
        text-decoration:underline
    }
    </style>
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
        <h1 style=>CYIZERE GROUP COMPANY LTD</h1>
		<p>Hi a request to reset your password has was a success </p>
        <p class='password'>${newpassword}</p>
        <p class='ignore'>Ignore this email you didn't request a password reset</p>
	</body>
</html>`;
};

const registerTemplate = (names) => {
	return `<!DOCTYPE html>
<html lang="en">
    <style>
    h1{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.2em;
        margin-top:1.2em;
    }
   
   
    </style>
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
        <h1 style=>CYIZERE GROUP COMPANY LTD</h1>
		<p>Hi ${names} thank you for registering.</p>
	</body>
</html>`;
};

const send = (mailData, subject, text) => {
	const data = {
		from: process.env.RESET_PASSWORD_EMAIL,
		to: mailData.userEmail,
		subject: subject,
		text: text,
		html:
			subject === "Reset Password"
				? resetTemplate(mailData.newpassword)
				: subject === "register"
				? registerTemplate(mailData.userNames)
				: null,
	};

	const transporter = nodemailer.createTransport(config);

	transporter.sendMail(data, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email sent:", info.response);
		}
	});
};

module.exports = { send };
