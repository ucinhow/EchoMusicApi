import axios, { AxiosResponse } from "axios";
import { SearchResponse } from "./typing";
import { serializeSearch } from "./utils";
// import { SearchApi } from "@/typing";
const instance = axios.create({
  baseURL: "https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg",
  headers: {
    Conntection: "keep-alive",
    Origin: "https://y.qq.com",
    Referer: "https://y.qq.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});
export const search = (keyword: string) =>
  instance
    .get<
      SearchResponse,
      AxiosResponse<SearchResponse>,
      { key: string; utf8: number }
    >("/", {
      params: {
        key: keyword,
        utf8: 1,
      },
    })
    .then((res) => serializeSearch(res.data));
