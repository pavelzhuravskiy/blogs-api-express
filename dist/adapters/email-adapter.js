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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.emailAdapter = {
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            let transporter = yield nodemailer_1.default.createTransport({
                service: "gmail",
                // host: "smtp.gmail.com",
                // port: 465,
                // secure: true,
                auth: {
                    user: "alex.crane.0599@gmail.com",
                    pass: "xzfcnxgxicdmqhdq"
                }
            });
            const mailOptions = {
                from: "IT-Inc admin <alex.crane.0599@gmail.com>",
                to: email,
                subject: subject,
                html: message,
            };
            // send mail with defined transport object
            yield transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`E-mail sent: ${info.response}`);
                }
            });
            return;
        });
    },
};
