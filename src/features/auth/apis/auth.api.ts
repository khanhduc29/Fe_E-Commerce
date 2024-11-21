import { AxiosResponse } from 'axios';
import { FromValue } from '../types/auth.types';
import { api, apiNotToken } from '../../../api/api';
import { AuthEndpointsEnum } from '../constants/auth.endpoints';

const signIn = (data: FromValue): Promise<AxiosResponse> => {
  return apiNotToken.post(AuthEndpointsEnum.LOGIN, data);
};

const register = (data: FromValue): Promise<AxiosResponse> => {
  return apiNotToken.post(AuthEndpointsEnum.REGISTER, data);
};

const refreshAccessToken = (): Promise<AxiosResponse> => {
  return apiNotToken.put(AuthEndpointsEnum.REFRESHTOKEN);
};

const logout = (): Promise<AxiosResponse> => {
  return apiNotToken.get(AuthEndpointsEnum.LOGOUT);
};

const currentUser = (): Promise<AxiosResponse> => {
  return api.get(AuthEndpointsEnum.CURRENT_USER);
}

export const authApi = {
  signIn,
  register,
  logout,
  refreshAccessToken,
  currentUser
};
