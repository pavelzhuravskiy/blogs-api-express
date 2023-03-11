import nodemailer from "nodemailer";
export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alex.crane.0599@gmail.com",
        pass: "sexmdobddlfqhjgp",
      },
    });

    // send mail with defined transport object
    return await transporter.sendMail({
      from: "Admin <alex.crane.0599@gmail.com>", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: message,
    });
  },
};