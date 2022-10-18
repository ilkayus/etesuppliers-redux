import axios from "axios";
import { ICompanyData } from "types/company.interface";
import { IUserData } from "types/authorization.interface";
import { urlHelper, checkUser, setHeader } from "api/api.helpers";

const getAllCompanies = async (
  user?: IUserData | undefined
): Promise<ICompanyData[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_ALL_URL;
  const response = await axios.get(url, config);
  //console.log(response.data);
  return response.data.data;
};

const getLastCompanies = async (
  user?: IUserData | undefined
): Promise<ICompanyData[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_LAST_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const createCompany = async (
  user: IUserData | undefined,
  companyData: ICompanyData
): Promise<ICompanyData[]> => {
  const url = urlHelper.BASE_URL + urlHelper.NEW_COMPANY_URL;
  const response = await axios.post(
    url,
    {
      name: companyData.name,
      legalNumber: companyData.legalNumber,
      photo: companyData.photo,
      incorporationCountry: companyData.incorporationCountry,
      website: companyData.website,
      description: companyData.description,
      createdAt: new Date(),
    },
    setHeader(user?.token)
  );
  //console.log(response);
  return response.data.data;
};

const getOneCompany = async (
  user: IUserData | undefined,
  id: string
): Promise<ICompanyData> => {
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_URL + `/${id}`;
  const response = await axios.get(url, setHeader(user?.token));
  //console.log(response);
  return response.data.data;
};

const deleteCompany = async (user: IUserData | undefined, id: string) => {
  const url = urlHelper.BASE_URL + urlHelper.REMOVE_COMPANY_URL + `/${id}`;
  const response = await axios.delete(url, setHeader(user?.token));
  //console.log(response);
  return response;
};

const updateCompany = async (
  user: IUserData | undefined,
  companyData: ICompanyData
): Promise<ICompanyData> => {
  const url =
    urlHelper.BASE_URL + urlHelper.UPDATE_COMPANY_URL + `/${companyData._id}`;
  const response = await axios.patch(
    url,
    { ...companyData, createdAt: new Date() },
    setHeader(user?.token)
  );
  //console.log(response);
  return response.data.data;
};

export {
  createCompany,
  getAllCompanies,
  getLastCompanies,
  deleteCompany,
  updateCompany,
  getOneCompany,
};
