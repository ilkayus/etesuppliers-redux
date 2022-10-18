export interface ICompanyData {
  _id?: string | undefined;
  name: string;
  legalNumber: string;
  photo?: string;
  incorporationCountry: string;
  website: string;
  description?: string;
  fields?: string[];
  owner?: {
    username: string;
    _id: string;
  };
  products?: string[];
  createdAt?: Date;
}
