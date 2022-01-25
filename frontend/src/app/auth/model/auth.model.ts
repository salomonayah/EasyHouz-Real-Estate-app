export interface User {
  userId?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password?: string;
  token?: string;
}

export interface UserCredential {
  email: string;
  password: string;
}
