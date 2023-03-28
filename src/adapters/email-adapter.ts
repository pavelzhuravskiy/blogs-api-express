import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
dotenv.config();

export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: email, // Change to your recipient
      from: "alex.crane.0599@gmail.com", // Change to your verified sender
      subject: subject,
      html: message,
    };
    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  },
};