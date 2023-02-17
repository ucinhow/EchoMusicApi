import axios from "axios";
import { baseGet } from "../common";
import { DetailResponse, LyricResponse } from "./typing";
import { serializeSongUrl, serializeSongLyric, serializeDetail } from "./utils";

const baseInstance = axios.create({
  timeout: 10000,
  headers: {
    Referer: "http://www.kuwo.cn/",
    Accept: "application/json",
    Connection: "keep-alive",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  },
});

export const queryUrl = (rid: number) =>
  baseInstance.get<string>("http://antiserver.kuwo.cn/anti.s", {
    params: {
      format: "mp3",
      br: "320kmp3",
      rid,
      type: "convert_url",
      response: "url",
    },
  });

export const songUrl = (rid: number) =>
  queryUrl(rid).then((res) => serializeSongUrl(res.data));

const LyricInstance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    Referer: "http://m.kuwo.cn/yinyue/",
    Connection: "keep-alive",
  },
});

export const queryLyric = (rid: number) =>
  LyricInstance.get<LyricResponse>(
    "http://m.kuwo.cn/newh5/singles/songinfoandlrc",
    {
      params: {
        musicId: rid,
      },
    }
  );

export const songLyric = (rid: number) =>
  queryLyric(rid).then((res) => serializeSongLyric(res.data));

export const queryDetail = (id: number) =>
  baseGet<DetailResponse>("/api/www/music/musicInfo", { params: { mid: id } });

export const songDetail = (id: number) =>
  queryDetail(id).then((res) => serializeDetail(res.data));
