const nodemailer = require("nodemailer");
const mailConfig = require("../config/email");

module.exports = nodemailer.createTransport(mailConfig);
