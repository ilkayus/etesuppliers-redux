import axios from "axios";
import { ICompanyData } from "types/company.interface";
import { IUserData } from "types/authorization.interface";
import {
  urlHelper,
  checkUser,
  setHeader,
  checkUserAndSetHeader,
} from "api/api.helpers";

const getAllCompanies = async (): Promise<ICompanyData[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_ALL_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const getLastCompanies = async (): Promise<ICompanyData[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_LAST_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const createCompany = async (
  companyData: ICompanyData
): Promise<ICompanyData[]> => {
  const config = checkUserAndSetHeader();
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
    config
  );
  //console.log(response);
  return response.data.data;
};

const getOneCompany = async (id: string): Promise<ICompanyData> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_COMPANY_URL + `/${id}`;
  const response = await axios.get(url, config);
  //console.log(response);
  return response.data.data;
};

const deleteCompany = async (id: string) => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.REMOVE_COMPANY_URL + `/${id}`;
  const response = await axios.delete(url, config);
  //console.log(response);
  return response;
};

const updateCompany = async (
  companyData: ICompanyData
): Promise<ICompanyData> => {
  const config = checkUserAndSetHeader();
  const url =
    urlHelper.BASE_URL + urlHelper.UPDATE_COMPANY_URL + `/${companyData._id}`;
  const response = await axios.patch(
    url,
    { ...companyData, createdAt: new Date() },
    config
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
