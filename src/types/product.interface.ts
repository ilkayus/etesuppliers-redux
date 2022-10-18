export interface IProductData {
  _id?: string | undefined;
  name: string;
  company: {
    name: string;
    owner: {
      _id: string;
      username: string;
    };
    _id: string;
  };
  category: string;
  photo?: string;
  amount?: number;
  amountUnit?: string;
  description?: string;
  owner?: {
    username: string;
    _id: string;
  };
  createdAt?: Date;
}
