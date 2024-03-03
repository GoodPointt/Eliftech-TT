import axios from 'axios';
import { instance } from './instance';
import { IOrderData } from '../interfaces/store';

const LIMIT = '8';

export const fetchStores = async () => {
  try {
    const { data } = await instance.get('/stores');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('fetchStores', error.status);
      console.error('fetchStores', error.response);
    } else {
      console.error('fetchStores', error);
    }
  }
};

export const fetchMedicines = async ({
  page = '1',
  search = '',
  storeid = '',
}) => {
  try {
    const { data } = await instance.get(
      `/medicines?limit=${LIMIT}&page=${page}&query=${search}&byStore=${storeid}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('fetchMedicines', error.status);
      console.error('fetchMedicines', error.response);
    } else {
      console.error('fetchMedicines', error);
    }
  }
};

export const createOrder = async (orderData: IOrderData) => {
  try {
    const res = await instance.post('/orders', orderData);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('createOrder', error.status);
      console.error('createOrder', error.response);
    } else {
      console.error('createOrder', error);
    }
  }
};
