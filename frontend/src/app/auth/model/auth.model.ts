export interface User {
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  token?: string;
}

export interface UserCredential {
  email: string;
  password: string;
}
