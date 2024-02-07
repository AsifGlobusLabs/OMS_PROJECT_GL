const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service:'gmail',
    auth: {
      user: "miteshpradhan97@gmail.com",
      pass: "yliu enkl droc zmdz",
  }
});

function sendEmail(email, token) {
  console.log(email);
  const mailOptions = {
    from: 'miteshpradhan97@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Use this token to reset your password: ${token}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };