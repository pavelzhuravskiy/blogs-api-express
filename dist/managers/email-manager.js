"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailManager = void 0;
const email_adapter_1 = require("../adapters/email-adapter");
exports.emailManager = {
    sendRegistrationEmail(email, confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationSubject = "Confirm your email";
            const registrationMessage = `<h1>Thank you for registration!</h1><p>To finish registration process please follow the link below:<a href="https://somesite.com/confirm-email?code=${confirmationCode}">complete registration</a></p>`;
            yield email_adapter_1.emailAdapter.sendEmail(email, registrationSubject, registrationMessage);
        });
    },
};
