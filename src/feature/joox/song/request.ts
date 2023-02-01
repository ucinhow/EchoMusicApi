import { get, getSecretKey } from "../common";
import { LyricResponse, SongInfoResponse } from "./typing";
import {
  serializeSongDetail,
  serializeSongLyric,
  serializeSongUrl,
} from "./utils";
import axios from "axios";

// const params = {
//   country: "hk",
//   fs: 1,
//   im: 0,
//   lang: "zh_CN",
//   lyric: 1,
//   uid: 294318400,
//   usk: "5ad4c81b33279309e12dc6eb17d7d939",
// };

// export const querySong = (id: string) => {
//   const secret = getSecretKey(params, id);
//   return get<TrackResponse>("openjoox2/v1/track/" + id, {
//     params: { ...params, secret },
//   });
// };

const instance = axios.create({
  baseURL: "https://api.joox.com",
  headers: {
    Connection: "keep-alive",
    Origin: "https://www.joox.com",
    Referer: "https://www.joox.com",
    Cookie:
      "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;",
    "X-Forwarded-For": "36.73.34.109",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});

const params = {
  // songid: item["songid"],
  lang: "zh_cn",
  country: "hk",
  from_type: "-1",
  channel_id: "-1",
  _: Date.now(),
};

export const querySong = async (id: string) => {
  return instance
    .get<string>("/web-fcgi-bin/web_get_songinfo", {
      params: { ...params, songid: id },
    })
    .then((res) => {
      const text = res.data;
      const json = JSON.parse(
        text.replace("MusicInfoCallback(", "").slice(0, -1)
      );
      return json as SongInfoResponse;
    });
};

export const songDetail = (id: string) =>
  querySong(id).then(serializeSongDetail);

export const songUrl = (id: string) => querySong(id).then(serializeSongUrl);

export const queryLyric = (id: string) =>
  get<LyricResponse>("/web-fcgi-bin/web_lyric", {
    params: { musicid: id, country: "hk", lang: "zh_cn" },
  });

export const songLyric = (id: string) =>
  queryLyric(id).then((res) => serializeSongLyric(res.data));
