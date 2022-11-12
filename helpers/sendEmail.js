const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;
const { BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<p>Click verify email ${BASE_URL}/api/auth/verify/${verificationToken}</p>`,
    from: "akvigi@meta.ua"
  }
  await sgMail
    .send(mail)
    .then(() => console.log(mail, "Email send successfully"))
    .catch((err) => console.log(err.message));
  return true;
};

module.exports = sendEmail;