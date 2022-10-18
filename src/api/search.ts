import axios from "axios";
import { ICompanyData } from "types/company.interface";
import { IUserData } from "types/authorization.interface";
import { urlHelper, checkUser, setHeader } from "api/api.helpers";

const getCompanyList = async (user?: IUserData | undefined): Promise<any[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_LIST_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const getSearchBarData = async (
  user?: IUserData | undefined
): Promise<any[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_SEARCHBAR_LIST_URL;
  const response = await axios.get(url, config);
  return response.data;
};

const getHomePageLogs = async (
  user?: IUserData | undefined
): Promise<any[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_HOMEPAGE_LOGS_URL;
  const response = await axios.get(url, config);
  return response.data;
};

const getSearchResult = async (
  user: IUserData | undefined,
  id: string
): Promise<any[]> => {
  const url = urlHelper.BASE_URL + urlHelper.GET_SEARCH_ONE_URL + `/${id}`;
  const response = await axios.get(url, setHeader(user?.token));
  return response.data;
};

export { getCompanyList, getSearchBarData, getHomePageLogs, getSearchResult };
