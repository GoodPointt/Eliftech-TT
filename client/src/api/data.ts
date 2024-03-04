import axios from 'axios';
import { instance } from './instance';
import { IOrderData } from '../interfaces/store';
import { LIMIT } from '../common/limit';
import { IFormData } from '../modules/Orders/Orders';

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
  sortBy = '',
  sortDir = '',
}) => {
  try {
    const { data } = await instance.get(
      `/medicines?limit=${LIMIT}&page=${page}&query=${search}&byStore=${storeid}&sortBy=${sortBy}&sortDir=${sortDir}`
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

export const fetchOrders = async ({ email, phone }: IFormData) => {
  try {
    const data = await instance.get(`/orders?email=${email}&phone=${phone}`);

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

export const sendCaptcha = async (captchaData: {
  captcha: string;
  hash: string;
}) => {
  try {
    const res = await instance.post('/captcha', captchaData);
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

export const generateCaptcah = async () => {
  try {
    const res = await instance.get('/captcha');
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('generateCaptcah', error.status);
      console.error('generateCaptcah', error.response);
    } else {
      console.error('generateCaptcah', error);
    }
  }
};
