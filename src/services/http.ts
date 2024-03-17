import axios, { Axios, AxiosDefaults, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://money.vvvtech.online/api";
const REFRESH_TIMEOUT = 150000; // 25min

let refreshPromise: Promise<boolean> | null;
interface HTTPInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;

  defaults: Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
}


const httpService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-type": "application/json",
  },
}) as HTTPInstance;

const getRefreshToken = async () => {
  try {
    const res = await axios.get<boolean>("/auth/refresh", {
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.data) {
      setTimeout(getRefreshToken, REFRESH_TIMEOUT);
    }

    return res.data;
  } catch (error) {
    return false;
  }
};

const onResponse = <T = any>(res: AxiosResponse<T>): T => {
  return res.data;
}

httpService.interceptors.response.use(
  onResponse,
  (err) => {
    const originalConfig = err?.config;

    if ((err?.response?.status === 401 || err?.response?.status === 403) && !originalConfig?.url?.includes('auth')) {
      if (!refreshPromise) {
        refreshPromise = getRefreshToken().then((val) => {
          refreshPromise = null;
          return val;
        });
      }

      refreshPromise.then((hasCredential) => {
        if (hasCredential) {
          return httpService.request(originalConfig);
        } else {
          Promise.reject(err);
        }
      });
    }

    Promise.reject(err);
  }
);

export default httpService;
