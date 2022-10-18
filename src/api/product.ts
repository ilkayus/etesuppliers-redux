import axios from "axios";
import { IProductData } from "types/product.interface";
import { IUserData } from "types/authorization.interface";
import { urlHelper, checkUser, setHeader } from "api/api.helpers";

const getAllProducts = async (
  user?: IUserData | undefined
): Promise<IProductData[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_ALL_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const getLastProducts = async (
  user?: IUserData | undefined
): Promise<IProductData[]> => {
  const config = checkUser(user);
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_LAST_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const createProduct = async (
  user: IUserData | undefined,
  productData: IProductData
): Promise<IProductData[]> => {
  const url = urlHelper.BASE_URL + urlHelper.NEW_PRODUCT_URL;
  const response = await axios.post(
    url,
    { ...productData, createdAt: new Date() },
    setHeader(user?.token)
  );
  //console.log(response);
  return response.data.data;
};

const getOneProduct = async (
  user: IUserData | undefined,
  id: string
): Promise<IProductData> => {
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_URL + `/${id}`;
  const response = await axios.get(url, setHeader(user?.token));
  //console.log(response);
  return response.data.data;
};

const deleteProduct = async (user: IUserData | undefined, id: string) => {
  const url = urlHelper.BASE_URL + urlHelper.REMOVE_PRODUCT_URL + `/${id}`;
  const response = await axios.delete(url, setHeader(user?.token));
  //console.log(response);
  return response;
};

const updateProduct = async (
  user: IUserData | undefined,
  productData: IProductData
): Promise<IProductData> => {
  const url =
    urlHelper.BASE_URL + urlHelper.UPDATE_PRODUCT_URL + `/${productData._id}`;
  const response = await axios.patch(
    url,
    { ...productData, createdAt: new Date() },
    setHeader(user?.token)
  );
  //console.log(response);
  return response.data.data;
};

export {
  createProduct,
  getAllProducts,
  getLastProducts,
  deleteProduct,
  updateProduct,
  getOneProduct,
};
