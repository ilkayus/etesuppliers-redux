export interface IUserData {
  _id: string;
  username: string;
  email: string;
  photo?: string;
  status: string;
  token: string;
  companies: string[];
  products: string[];
  role: string;
}
