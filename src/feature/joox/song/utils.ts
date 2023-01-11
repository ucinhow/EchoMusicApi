import { TrackResponse, TrackItem } from "./typing";
import {
  PlaySource,
  SongDetail,
  SongItem,
  SongLyric,
  SongPlayUrl,
} from "@/common/typing";
import { convertImage } from "../common";
import { simplify } from "simplify-chinese";
import { parseTimestamp } from "@/common/utils";
const convertLyric = (lyric: string) => {
  const decodedLyric = simplify(Buffer.from(lyric, "base64").toString());
  const res: [number, string][] = [];
  const lines = decodedLyric.split("\n");
  const index = lines.findIndex((line) => /^\[.*\].+$/.test(line));
  if (~index) {
    lines.slice(index).forEach((str) => {
      const rightBracketIndex = str.indexOf("]");
      const left = str.slice(1, rightBracketIndex);
      const right = str.slice(rightBracketIndex + 1);
      const timeList = left.replace(":", ".").split(".");
      const time =
        (Number(timeList[0]) * 60 + Number(timeList[1])) * 1000 +
        Number(timeList[2]) * 10;
      res.push([time, right]);
    });
  }
  return res;
};

export const serializeSongItem = (data: TrackItem): SongItem => ({
  name: data.name,
  singerName: data.artist_list.map((a) => a.name),
  albumName: data.album_name,
  duration: data.play_duration,
  [PlaySource.joox]: {
    id: data.id,
    singerId: data.artist_list.map((a) => a.id),
    albumId: data.album_id,
    playable: data.is_playable,
  },
});

export const serializeSongDetail = (data: TrackResponse): SongDetail => ({
  id: data.id,
  name: data.name,
  picUrl: convertImage(data.images),
  singer: data.artist_list.map((a) => ({ name: a.name, id: a.id })),
  publicTime: parseTimestamp(data.public_time),
  duration: data.play_duration,
  album: { name: data.album_name, id: data.album_id },
});

export const serializeSongUrl = (data: TrackResponse): SongPlayUrl => ({
  url: data.play_url_list[0],
});

export const serializeSongLyric = (data: TrackResponse): SongLyric => ({
  lyric: convertLyric(data.lrc_content),
  lyricExist: Boolean(data.lrc_exist),
});
