import { emailManager } from "../managers/email-manager";

export const authService = {
  async register(user: any) {
    await emailManager.sendRegistrationEmail({});
  },
};