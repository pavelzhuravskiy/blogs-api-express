import { emailAdapter } from "../adapters/email-adapter";

export const emailManager = {
  async sendRegistrationEmail(newUserEmail: string, confirmationCode: string) {
    const registrationSubject = "Confirm your email";
    const registrationMessage = `<h1>Thank you for registration!</h1><p>To finish registration process please follow the link below:<a href="https://somesite.com/confirm-email?code=${confirmationCode}">complete registration</a></p>`;
    await emailAdapter.sendEmail(
      newUserEmail,
      registrationSubject,
      registrationMessage
    );
  },
};