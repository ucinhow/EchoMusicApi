import { AxiosResponse } from "axios";
import { postMusics, instanceC } from "../common";
import {
  SongDetailResponse,
  SongUrlResponse,
  SongLyricResponse,
} from "./typing";
import {
  serializeSongDetail,
  serializeSongLyric,
  serializeSongUrl,
} from "./utils";
const createPlayUrlParam = (mid: string) => ({
  req_1: {
    module: "vkey.GetVkeyServer",
    method: "CgiGetVkey",
    param: {
      songmid: [mid],
      guid: "0",
      uin: "0",
    },
  },
});

const createDetailParam = (mid: string) => ({
  req_1: {
    method: "get_song_detail_yqq",
    module: "music.pf_song_detail_svr",
    param: { song_mid: mid },
  },
});

const createLyricParam = (mid: string) => ({
  _: Date.now(),
  songmid: mid,
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  uin: "0",
});

export const queryPlayUrl = (mid: string) =>
  postMusics<ReturnType<typeof createPlayUrlParam>, SongUrlResponse>(
    createPlayUrlParam(mid)
  );

export const songUrl = (mid: string) =>
  queryPlayUrl(mid).then((res) => serializeSongUrl(res.data));

export const querySongDetail = (mid: string) =>
  postMusics<ReturnType<typeof createDetailParam>, SongDetailResponse>(
    createDetailParam(mid)
  );

export const songDetail = (mid: string) =>
  querySongDetail(mid).then((res) => serializeSongDetail(res.data));

export const querySongLyric = (mid: string) =>
  instanceC.get<SongLyricResponse, AxiosResponse<SongLyricResponse>>(
    "/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
    {
      params: createLyricParam(mid),
    }
  );

export const songLyric = (mid: string) =>
  querySongLyric(mid).then((res) => serializeSongLyric(res.data));
