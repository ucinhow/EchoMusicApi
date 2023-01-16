import { addRetryInterceptor } from "@/common/utils";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

const commHeaders = {
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
};

const setInstanceToken = (instance: AxiosInstance, url: string) =>
  instance.get(url).then((res) => {
    const cookieIdx = (res.headers["set-cookie"] || []).findIndex((cookie) =>
      cookie.startsWith("kw_token")
    );
    const cookie = ~cookieIdx
      ? res.headers["set-cookie"]?.[cookieIdx] || ""
      : "";
    const keyAndValue = cookie.slice(0, cookie.indexOf(";"));
    const token = keyAndValue.split("=")[1];
    instance.defaults.headers["csrf"] = token;
    instance.defaults.headers["Cookie"] = keyAndValue;
  });

export const createCommInstance = (tokenUrl: string) => {
  const instance = axios.create({
    baseURL: "http://www.kuwo.cn/",
    timeout: 10000,
    headers: commHeaders,
    withCredentials: true,
  });
  addRetryInterceptor(instance);
  (async () => await setInstanceToken(instance, tokenUrl))();
  return instance;
};

const baseInstance = createCommInstance("/");

export const get = <R>(path: string, config: AxiosRequestConfig) =>
  baseInstance.get<any, AxiosResponse<R>>(path, config);
