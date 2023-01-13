import { get, getSecretKey } from "../common";
import { TrackResponse } from "./typing";
import {
  serializeSongDetail,
  serializeSongLyric,
  serializeSongUrl,
} from "./utils";

const params = {
  country: "hk",
  fs: 1,
  im: 0,
  lang: "zh_CN",
  lyric: 1,
  uid: 294318400,
  usk: "5ad4c81b33279309e12dc6eb17d7d939",
};

export const querySong = (id: string) => {
  const secret = getSecretKey(params, id);
  return get<TrackResponse>("openjoox2/v1/track/" + id, {
    params: { ...params, secret },
  });
};

export const songDetail = (id: string) =>
  querySong(id).then((res) => serializeSongDetail(res.data));

export const songUrl = (id: string) =>
  querySong(id).then((res) => serializeSongUrl(res.data));

export const songLyric = (id: string) =>
  querySong(id).then((res) => serializeSongLyric(res.data));
