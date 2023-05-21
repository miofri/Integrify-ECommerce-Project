import { CartInterface } from "./cartInterface";

export interface UserCredentials {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface UserCart {
  user: UserCredentials;
  cart?: CartInterface[];
}

export interface UserCredentialsAndCart {
  users: UserCart[];
}
