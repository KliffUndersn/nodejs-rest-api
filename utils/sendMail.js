const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_KEY} = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async(data) => {
    const newEmail = {...data, from: "kliffundersn90@gmail.com"};
    try {
        await sgMail.send(newEmail);
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = sendMail;