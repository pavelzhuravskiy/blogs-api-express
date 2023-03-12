import { emailAdapter } from "../adapters/email-adapter";

// +++++ Registration start +++++

const registrationSubject = "Confirm your email";
const registrationMessage =
  "<h1>Thank you for registration!</h1><p>To finish registration process please follow the link below:<a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a></p>";

export const emailManager = {
  async sendRegistrationEmail(newUserEmail: string) {
    await emailAdapter.sendEmail(
      newUserEmail,
      registrationSubject,
      registrationMessage
    );
  },
};

// ----- Registration end -----