import axios from 'axios';
import {Product} from '../types';

const API_URL = 'https://fakestoreapi.com';

export const api = {
  getProducts: async (page: number = 1, limit: number = 10) => {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`,
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
