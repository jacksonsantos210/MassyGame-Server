const nodemailer = require("nodemailer");
const mailConfig = require("../config/email");

export default nodemailer.createTransport(mailConfig);
