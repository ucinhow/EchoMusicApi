import { Song as RawSong } from "./typing";
import { Song } from "@/typing";
import { convertImage } from "../common";
import moment from "moment";
import { simplify } from "simplify-chinese";
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

export const serializeSong = (data: RawSong): Song => ({
  albumId: data.album_id,
  albumName: simplify(data.album_name),
  singerList: data.artist_list.map((item) => ({
    id: item.id,
    name: simplify(item.name),
  })),
  // genre: data.genre,
  id: data.id,
  pic: convertImage(data.images),
  lyric: convertLyric(data.lrc_content), // base64 require decode
  lyricExist: Boolean(data.lrc_exist), // 1 for exist
  name: simplify(data.name),
  duration: data.play_duration * 1000, // seconds
  publicTime: moment(data.public_time, "YYYY-MM-DD").valueOf(),
  playable: data.is_playable,
  playUrl: data.play_url_list,
});
