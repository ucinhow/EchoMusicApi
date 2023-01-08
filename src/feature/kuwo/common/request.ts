import { ERROR_MSG } from "@/common/constant";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { TOKEN_ERROR_MSG } from "./constant";
export const instance = axios.create({
  baseURL: "http://kuwo.cn",
  timeout: 10000,
  headers: {
    Referer: "http://www.kuwo.cn/",
    Accept: "application/json",
    Connection: "keep-alive",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});

const reg = /kw_token=(\w+);/;

const setInstanceToken = () =>
  instance.get("/").then((res) => {
    const cookie = res.headers["set-cookie"]?.[0] || "";
    const token = reg.exec(cookie)?.[1] || "";
    instance.defaults.headers["Cookie"] = cookie;
    instance.defaults.headers["csrf"] = token;
  });

setInstanceToken();

instance.interceptors.response.use(async (response) => {
  if (response.data.message === TOKEN_ERROR_MSG) {
    await setInstanceToken();
    return instance.get(response.request.path).catch(() => {
      throw new Error(ERROR_MSG.KuwoTokenError);
    });
  }
  return response;
});

export const get = <R>(path: string, config: AxiosRequestConfig) =>
  instance.get<any, AxiosResponse<R>>(path, config);
