import { addRetryInterceptor } from "@/common/utils";
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  // Axios,
} from "axios";
import { addCookieInterceptor } from "./utils";
import limitRequest from "./limitRequest";
const commHeaders = {
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
};

const setInstanceToken = (instance: AxiosInstance, url: string) =>
  instance.get(url);

export const createCommRequest = (tokenUrl: string) => {
  const instance = axios.create({
    baseURL: "http://www.kuwo.cn",
    timeout: 10000,
    headers: commHeaders,
    // withCredentials: true,
  });
  addRetryInterceptor(instance);
  addCookieInterceptor(instance);
  (async () => await setInstanceToken(instance, tokenUrl))();

  const get = <Response>(path: string, config: AxiosRequestConfig) => {
    const requestFn = () =>
      instance.get<any, AxiosResponse<Response>>(path, config);
    return limitRequest.request<Response>(requestFn);
  };
  return get;
};
export const baseGet = createCommRequest("/");
// const baseInstance = createCommInstance("/");

// export const get = <R>(path: string, config: AxiosRequestConfig) =>
//   baseInstance.get<any, AxiosResponse<R>>(path, config);
