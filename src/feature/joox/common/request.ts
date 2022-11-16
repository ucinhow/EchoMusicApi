import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: "https://api-jooxtt.sanook.com",
  headers: {
    Connection: "keep-alive",
    Origin: "https://www.joox.com",
    Referer: "https://www.joox.com",
    Cookie:
      "wmid=294318400; user_type=2; country=hk; session_key=5ad4c81b33279309e12dc6eb17d7d939;",
    "X-Forwarded-For": "36.73.34.109",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});
// export const commHeaders = ;
// export const post = <P, R>(paramsBody: P, sign: string) =>
//   instance.post<R, AxiosResponse<R>, P>(
//     `/cgi-bin/musics.fcg?_=${Date.now()}&sign=${sign}`,
//     paramsBody
//   );
export const get = <P, R>(path: string, config: AxiosRequestConfig<P>) =>
  instance.get<R, AxiosResponse<R>, P>(path, config);
