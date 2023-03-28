import { SentMessageInfo } from "nodemailer";

const nodemailer = require("nodemailer");

export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error: Error | null, success: boolean) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: {
        name: `IT-INC Admin`,
        address: process.env.EMAIL,
      },
      to: email,
      subject: subject,
      html: message,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(
        mailData,
        (err: Error | null, info: SentMessageInfo) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        }
      );
    });
  },
};