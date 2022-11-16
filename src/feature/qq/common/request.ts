import axios from "axios";
import { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://u.y.qq.com",
  timeout: 10000,
  headers: {
    Origin: "https://i.y.qq.com",
    Referer: "https://i.y.qq.com",
    Accept: "application/json",
    Connection: "keep-alive",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 12.6.0 ) AppleWebKit/600.1.4 (KHTML, like Gecko) patch/2 QQMusic/8.4.0 Released[1] Skinid/10209|||2|||1fd4af",
    "Content-Type": "text/plain",
  },
});

export const post = <P, R>(paramsBody: P, sign: string) =>
  instance.post<R, AxiosResponse<R>, P>(
    `/cgi-bin/musics.fcg?_=${Date.now()}&sign=${sign}`,
    paramsBody
  );

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

export default instance;
