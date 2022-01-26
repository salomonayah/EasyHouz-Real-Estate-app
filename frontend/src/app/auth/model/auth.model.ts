export interface User {
  userId?: string;
  fullname: string;
  phonenumber: string;
  email: string;
  password?: string;
  token?: string;
}

export interface UserCredential {
  email: string;
  password: string;
}
