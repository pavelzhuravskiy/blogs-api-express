import nodemailer from "nodemailer";
export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Pavel Zhuravskiy" <pavel.zhuravskiy@zohomail.eu>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: message,
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return
      } else {
        console.log(`E-mail sent: ${info.response}`);
      }
    });
  },
};