export type MongoUserModelWithPassword = {
  accountData: {
    login: string;
    password: string;
    email: string;
    createdAt: string;
    isMembership: boolean;
  };
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
  };
};