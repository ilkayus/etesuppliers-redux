import axios from "axios";
import { IUserData } from "types/authorization.interface";
import { urlHelper } from "api/api.helpers";

const login = async (email: string, password: string): Promise<IUserData> => {
  const url = urlHelper.BASE_URL + urlHelper.LOGIN_URL;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  return response.data;
};

const register = async (
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
): Promise<IUserData> => {
  const url = urlHelper.BASE_URL + urlHelper.REGISTER_URL;
  const response = await axios.post(url, {
    email: email,
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  return response.data;
};

export { login, register };
