import { WithId } from "mongodb";

export type UserDBModel = WithId<{
  accountData: {
    login: string;
    password: string;
    email: string;
    createdAt: string;
    isMembership: boolean;
  };
  emailConfirmation: {
    confirmationCode: string | null;
    expirationDate: Date | null;
    isConfirmed: boolean;
  };
  passwordRecovery: {
    recoveryCode: string | null;
    expirationDate: Date | null;
  };
}>;