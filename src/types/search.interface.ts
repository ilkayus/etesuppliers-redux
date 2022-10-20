type companyList = {
  name: string;
  _id: string;
};

type productList = {
  company: string;
  name: string;
  _id: string;
};

export interface ISearchData {
  companyList: companyList[];
  productList: productList[];
  status: string;
  message: string;
}

export interface ILogsData {
  companyLogs: string[];
  productLogs: string[];
  systemLogs: string[];
  status: string;
  message: string;
}
