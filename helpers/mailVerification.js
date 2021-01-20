const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const mailOptions = async (email) => ({
  from: EMAIL, // sender address
  to: email, // list of receivers
  subject: "Fasto Email Verification..", // Subject line
  text: "Hello world?", // plain text body
  html:
    "Hello,<br> Please Click on the link to verify your email.<br><a>Click here to verify</a>", // html body
});

module.exports = { transporter, mailOptions };
