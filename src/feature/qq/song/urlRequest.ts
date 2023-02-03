import axios from "axios";
import { SongUrlResponse } from "./typing";

const createParams = (mid: string) => ({
  req_0: {
    module: "CDN.SrfCdnDispatchServer",
    method: "GetCdnDispatch",
    param: { guid: "3982823384", calltype: 0, userip: "" },
  },
  req_1: {
    module: "vkey.GetVkeyServer",
    method: "CgiGetVkey",
    param: {
      guid: "3982823384",
      songmid: [mid],
      songtype: [0],
      uin: "0",
      loginflag: 1,
      platform: "20",
    },
  },
  comm: { uin: 0, format: "json", ct: 24, cv: 0 },
});

const instance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    Referer: "http://y.qq.com",
    Connection: "keep-alive",
  },
});

export const queryPlayUrl = (mid: string) =>
  instance.get<SongUrlResponse>("https://u.y.qq.com/cgi-bin/musicu.fcg", {
    params: { data: JSON.stringify(createParams(mid)) },
  });
