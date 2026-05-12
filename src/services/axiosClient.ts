import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"; 
import toast from "react-hot-toast";

const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL+"/api/v1";
  
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError<any>) => {

    // Bad Request
    if (error.response?.status === 400) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.detail
      );
    }

    // Unauthorized
    if (error.response?.status === 401) {

      // Backend cookie already invalid
      window.location.href = "/login";
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.error("Access Forbidden");
    }

    // Server Error
    if (error.response?.status === 500) {
      console.error("Internal Server Error");
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.get<T>(url, config);

    return response.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.post<T>(
      url,
      data,
      config
    );

    return response.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.put<T>(
      url,
      data,
      config
    );

    return response.data;
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.patch<T>(
      url,
      data,
      config
    );

    return response.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.delete<T>(
      url,
      config
    );

    return response.data;
  },
};

export default axiosClient;