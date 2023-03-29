import mongoose from "mongoose";
import { UserDBModel } from "../models/UserDBModel";

const userSchema = new mongoose.Schema<UserDBModel>({
  accountData: {
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: String,
    isMembership: Boolean,
  },
  emailConfirmation: {
    confirmationCode: String,
    expirationDate: Date,
    isConfirmed: Boolean,
  },
  passwordRecovery: {
    recoveryCode: String,
    expirationDate: Date,
  },
});

export const Users = mongoose.model("users", userSchema);