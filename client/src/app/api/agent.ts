import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginatedResponse } from '../models/pagination';
import { store } from '../store/configureStore';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async response => {
  await sleep();
  const pagination = response.headers['pagination'];
  if (pagination) {
    response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
  }
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  if (status === 400) {
    if (data.errors) {
      const modelStateErrors: string[] = [];
      for (const key in data.errors) {
        if (data.errors[key]) {
          modelStateErrors.push(data.errors[key]);
        }
      }
      throw modelStateErrors.flat();
    }
    return Promise.reject(error.response);
  }
});

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get('products', params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get('products/filters')
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: any) => requests.post('account/login', values),
  register: (values: any) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
};

const agent = {
  Catalog,
  Basket,
  Account
};

export default agent;
