import { IUserData } from "types/authorization.interface";

// const BASE_URL = "http://localhost:9000/api/v1";
const BASE_URL = "https://etecube-assignment-server.herokuapp.com/api/v1";
const REGISTER_URL = "/users/register";
const LOGIN_URL = "/users/login";

const NEW_COMPANY_URL = "/companies/new";
const REMOVE_COMPANY_URL = "/companies/remove";
const UPDATE_COMPANY_URL = "/companies/update";
const GET_COMPANY_URL = "/companies/getone";
const GET_COMPANY_ALL_URL = "/companies/getall";
const GET_COMPANY_LAST_URL = "/companies/getlast";

const NEW_PRODUCT_URL = "/products/new";
const REMOVE_PRODUCT_URL = "/products/remove";
const UPDATE_PRODUCT_URL = "/products/update";
const GET_PRODUCT_URL = "/products/getone";
const GET_PRODUCT_ALL_URL = "/products/getall";
const GET_PRODUCT_LAST_URL = "/products/getlast";

const GET_COMPANY_LIST_URL = "/search/companylist";
const GET_SEARCHBAR_LIST_URL = "/search/searchbarlist";
const GET_HOMEPAGE_LOGS_URL = "/search/logs";
const GET_SEARCH_ONE_URL = "/search/searchone";

//-----------------------------------------------
const setHeader = (token: string | undefined): any => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return config;
};
//-----------------------------------------------
const checkUser = (user: IUserData | undefined): any => {
  const config = user
    ? {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
    : {};
  return config;
};
//-----------------------------------------------
const urlBuilder = (fetchString: string, fetchInfo: string) => {
  return `${fetchString}/${fetchInfo}`;
};
//-----------------------------------------------

const urlHelper = {
  BASE_URL,
  REGISTER_URL,
  LOGIN_URL,
  NEW_COMPANY_URL,
  GET_COMPANY_URL,
  REMOVE_COMPANY_URL,
  UPDATE_COMPANY_URL,
  NEW_PRODUCT_URL,
  GET_PRODUCT_URL,
  REMOVE_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  GET_COMPANY_ALL_URL,
  GET_COMPANY_LAST_URL,
  GET_PRODUCT_ALL_URL,
  GET_PRODUCT_LAST_URL,
  GET_COMPANY_LIST_URL,
  GET_SEARCHBAR_LIST_URL,
  GET_HOMEPAGE_LOGS_URL,
  GET_SEARCH_ONE_URL,
};

export { urlHelper, checkUser, urlBuilder, setHeader };
