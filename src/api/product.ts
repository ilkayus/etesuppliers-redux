import axios from "axios";
import { IProductData } from "types/product.interface";
import { IUserData } from "types/authorization.interface";
import {
  urlHelper,
  checkUser,
  setHeader,
  checkUserAndSetHeader,
} from "api/api.helpers";

const getAllProducts = async (): Promise<IProductData[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_ALL_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const getLastProducts = async (): Promise<IProductData[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_LAST_URL;
  const response = await axios.get(url, config);
  return response.data.data;
};

const createProduct = async (
  productData: IProductData
): Promise<IProductData[]> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.NEW_PRODUCT_URL;
  const response = await axios.post(
    url,
    { ...productData, createdAt: new Date() },
    config
  );
  //console.log(response);
  return response.data.data;
};

const getOneProduct = async (id: string): Promise<IProductData> => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.GET_PRODUCT_URL + `/${id}`;
  const response = await axios.get(url, config);
  //console.log(response);
  return response.data.data;
};

const deleteProduct = async (id: string) => {
  const config = checkUserAndSetHeader();
  const url = urlHelper.BASE_URL + urlHelper.REMOVE_PRODUCT_URL + `/${id}`;
  const response = await axios.delete(url, config);
  //console.log(response);
  return response;
};

const updateProduct = async (
  productData: IProductData
): Promise<IProductData> => {
  const config = checkUserAndSetHeader();
  const url =
    urlHelper.BASE_URL + urlHelper.UPDATE_PRODUCT_URL + `/${productData._id}`;
  const response = await axios.patch(
    url,
    { ...productData, createdAt: new Date() },
    config
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
