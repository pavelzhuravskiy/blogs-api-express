import nodemailer from "nodemailer";
export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "DebugMail",
      auth: {
        user: "alex.crane.0599@gmail.com",
        pass: "AT#5@6NWr56*6gRWz@hgf",
      },
    });

    const mailOptions = {
      from: "Admin <alex.crane.0599@gmail.com>", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: message,
    }

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(`E-mail sent: ${info.response}`)
      }
    });
  },
};