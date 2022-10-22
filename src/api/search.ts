import axios from "axios";
import { ICompanyData } from "types/company.interface";
import { ISearchData, ILogsData } from "types/search.interface";
import { urlHelper, checkUserAndSetHeader } from "api/api.helpers";
import { IProductData } from "types/product.interface";

const getCompanyList = async (): Promise<any[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_LIST_URL;
  const response = await axios.get(url, config);
  console.log("asdasdasdasdasdasdasdasdas");
  return response.data.data;
};

const getSearchBarData = async (): Promise<ISearchData> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_SEARCHBAR_LIST_URL;
  const response = await axios.get(url, config);
  return response.data;
};

const getHomePageLogs = async (): Promise<ILogsData> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_HOMEPAGE_LOGS_URL;
  const response = await axios.get(url, config);
  return response.data;
};

const getSearchResult = async (
  id: string
): Promise<ICompanyData | IProductData> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_SEARCH_ONE_URL + `/${id}`;
  const response = await axios.get(url, config);
  return response.data;
};

export { getCompanyList, getSearchBarData, getHomePageLogs, getSearchResult };
