export type Credentials = {
  email: string;
  password: string;
};

export type NewUser = Credentials & {
  confirmPassword: string;
};