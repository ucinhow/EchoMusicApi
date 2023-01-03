import {
  SongDetailResponse,
  SongInfo,
  SongLyricResponse,
  SongUrlResponse,
} from "./typing";
import {
  SongDetail,
  SongItem,
  SongLyric,
  SongPlayUrl,
} from "@/common/typing/song";
import { parseTimestamp } from "@/common/utils";
import { Source } from "@/common/typing/common";
import { parsePicUrl } from "../common";
export const serializeSongDetail = (res: SongDetailResponse): SongDetail => {
  const data = res.req_1.data.track_info;
  return {
    id: data.mid,
    name: data.name,
    picUrl: parsePicUrl(data.album.pmid),
    singer: data.singer.map((s) => ({ name: s.name, id: s.id.toString() })),
    publicTime: parseTimestamp(data.time_public),
    duration: data.interval,
    // intro: info.intro.content?.[0].value || "",
    album: { name: data.album.name, id: data.album.id.toString() },
  };
};

export const serializeSongUrl = (res: SongUrlResponse): SongPlayUrl => ({
  url: res.req_1.data.midurlinfo.map((i) => i.purl),
});

export const serializeSongLyric = (res: SongLyricResponse): SongLyric => ({
  lyric: res.lyric || "",
  lyricExist: Boolean(res.lyric),
});

export const serializeSongItem = (item: SongInfo) => ({
  name: item.name,
  singerName: item.singer.map((s) => s.name),
  albumName: item.album.name,
  duration: item.interval,
  [Source.qq]: {
    id: item.mid,
    singerId: item.singer.map((s) => s.id.toString()),
    albumId: item.album.mid,
    playable:
      item.pay.pay_play !== 1 ||
      item.pay.pay_status === 1 ||
      item.pay.time_free === 1,
  },
});

export const serializeSongItemList = (data: SongInfo[]): SongItem[] => {
  const res: SongItem[] = [];
  for (const item of data) {
    res.push(serializeSongItem(item));
    if (item.grp?.length) {
      res.push(...item.grp.map(serializeSongItem));
    }
  }
  return res;
};
