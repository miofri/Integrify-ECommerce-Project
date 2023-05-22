import { CartInterface } from "./cartInterface";

export interface UserCredentials {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Users {
  users: UserCredentials[];
  status?: string;
  error?: string;
}

export interface UserLoggedIn extends UserCredentials {
  loggedIn: boolean;
}
