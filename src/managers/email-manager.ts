import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendRegistrationEmail({}) {
        await emailAdapter.sendEmail("","","")
    }
}