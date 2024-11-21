/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// import { store } from '../store/store';
import { trimValue } from '../helpers/trim-value';
import { toCamel } from '../helpers/convert-object-keys';
import { store } from '../store/store';
import { logout } from '../features/auth/redux/auth.slice';

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = (
  request: AxiosRequestConfig
): InternalAxiosRequestConfig => {
  const requestConfig = trimValue(request);
  // if (requestConfig.params) {
  //   requestConfig.params = toSnakeCase(requestConfig.params, true);
  // }
  // if (requestConfig.data) {
  //   requestConfig.data = toSnakeCase(requestConfig.data, true);
  // }

  // const { accessToken } = store.getState().auth;

  // if (accessToken) {
  //   requestConfig.headers = {
  //     ...(requestConfig.headers || {}),
  //     Authorization: `Bearer ${accessToken}`,
  //   };
  // }

  return requestConfig as InternalAxiosRequestConfig;
};

const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamel(response.data);
  return response;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: any) => {
  // Nếu có lỗi và có response, xử lý lỗi và chuyển đổi response
  if (axiosError && axiosError.response) {
    axiosError.response = toCamel(axiosError.response);
    if (axiosError?.response?.data) {
      const { data } = axiosError.response;
      if (data?.mes == 'jwt must be provided') {
        store.dispatch(logout());
      }
    }
  }
  return Promise.reject(axiosError);
};

/** Setup an API instance with token */
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/** Setup an API instance without token */
export const apiNotToken = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/** Add interceptor */
// api.interceptors.request.use(authInterceptor);
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
apiNotToken.interceptors.response.use(responseInterceptor, errorInterceptor);
