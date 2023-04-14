import { ObjectId } from "mongodb";

export class IUser {
  constructor(
    public _id: ObjectId,
    public accountData: {
      login: string;
      password: string;
      email: string;
      createdAt: string;
      isMembership: boolean;
    },
    public emailConfirmation: {
      confirmationCode: string | null;
      expirationDate: Date | null;
      isConfirmed: boolean;
    },
    public passwordRecovery: {
      recoveryCode: string | null;
      expirationDate: Date | null;
    }
  ) {}
}