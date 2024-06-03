import IRegisterData from 'types/registerData';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const login = (body: { email: string; password: string }) => {
  return AxiosClient.post(END_POINT.AUTH.LOGIN, body);
};

const getMe = () => {
  return AxiosClient.post(END_POINT.AUTH.GET_ME);
};

const register = (body: IRegisterData) => {
  return AxiosClient.post(END_POINT.AUTH.REGISTER, body);
};
export { login, getMe, register };
