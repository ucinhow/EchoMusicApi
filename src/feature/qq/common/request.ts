import axios, { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import getSecuritySign from "./getSecuritySign";
const instanceU = axios.create({
  baseURL: "https://u.y.qq.com",
  timeout: 10000,
  headers: {
    Origin: "https://y.qq.com",
    // Referer: "https://y.qq.com",
    Accept: "application/json",
    Connection: "keep-alive",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});

export const postMusics = <P extends Record<string, any>, R>(
  paramsBody: P,
  config?: AxiosRequestConfig
) =>
  instanceU.post<R, AxiosResponse<R>, P>(
    `/cgi-bin/musics.fcg?_=${Date.now()}&sign=${getSecuritySign(paramsBody)}`,
    paramsBody,
    config
  );
export const postMusicu = <P, R>(paramsBody: P) =>
  instanceU.post<R, AxiosResponse<R>, P>("/cgi-bin/musicu.fcg", paramsBody);

export const commParams = {
  g_tk: 5381,
  uin: 0,
  format: "json",
  ct: 6,
  // cv: 1770,
  platform: "wk_v17",
  uid: "",
  guid: "",
};
export const instanceC = axios.create({
  baseURL: "https://c.y.qq.com/",
  headers: {
    Connection: "keep-alive",
    Origin: "https://y.qq.com",
    Referer: "https://y.qq.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});
// export const;
// export default instance;
export const webComm = {
  cv: 4747474,
  ct: 24,
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq.json",
  // needNewCode: 1,
  uin: 0,
  g_tk_new_20200303: 5381,
  g_tk: 5381,
};
