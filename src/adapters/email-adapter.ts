import nodemailer from "nodemailer";
export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user:"alex.crane.0599@gmail.com",
        pass:"ljovcwhzdlxcvtbg"
      }
    });

    // let transporter = nodemailer.createTransport({
    //   host: 'smtp.zoho.eu',
    //   port: 465,
    //   secure: true, //ssl
    //   auth: {
    //     user:process.env.EMAIL,
    //     pass:process.env.EMAIL_PASSWORD
    //   }
    // });

    const mailOptions = {
      from: "IT-Inc admin <alex.crane.0599@gmail.com>", // sender address
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