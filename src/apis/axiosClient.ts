import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { toast } from 'react-toastify';
import { STORAGE, getLocalStorage, removeLocalStorage } from 'utils/storage';

const BASE_URL = 'http://localhost:8081';
// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
};

const showErrorApi = (data) => {
  if (data && typeof data.message === 'string') {
    toast.error(data.message);
  }

  if (data && data.messages.length > 0) {
    logOnDev(data);
    toast.error(data.message);
  } else {
  }
};

const getToken = () => {
  const userToken = getLocalStorage(STORAGE.USER_TOKEN);
  return userToken || '';
};

const requestConfig = {
  baseURL: BASE_URL,
  timeout: 10000, // 10s
};

const request: AxiosInstance = axios.create(requestConfig);

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log('🚀 [API] CONFIG: ', config);

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response.data;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    console.log('🚀 [API] ERROR: ', { error });
    // toast.error(error.message);
    const { response } = error;
    // const { method, url } = error.config as AxiosRequestConfig;
    const {
      // statusText,
      status,
      data,
    } = response ?? {};

    // console.log('======> error', { message, method, url, statusText, status });
    if (status === 401 || status === 403) {
      removeLocalStorage(STORAGE.USER_TOKEN);
    } else {
      showErrorApi(data);
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`);
    // toast.error(error.message);
  }

  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onErrorResponse);
request.interceptors.response.use(onResponse, onErrorResponse);
export default request;