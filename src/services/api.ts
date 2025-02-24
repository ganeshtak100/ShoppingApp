import axios from 'axios';
import {Product} from '../types';

const API_URL = 'https://fakestoreapi.com';

export const api = {
  getProducts: async (page: number = 1, limit: number = 10) => {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`,
        // `${API_URL}/products?limit=${limit}&page=${page}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (id: number) => {
    try {
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
const onRequestFullFilled = async (request: any) => {
  console.log(
    '%c Starting api Request',
    'background: #33AAFF; color: #FFF',
    request,
  );
  return request;
};

const onRequestRejected = (error: any) => {
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequestFullFilled, onRequestRejected);
axios.interceptors.response.use(
  response => {
    console.log(
      '%c Response success:',
      'background: #009944; color: #FFF',
      response.data,
    );
    return Promise.resolve(response);
  },
  error => {
    console.log('%c Response:', 'background: #DD0000; color: #FFF', error);

    return Promise.reject(error?.response?.data || 'An Error occurred');
  },
);
