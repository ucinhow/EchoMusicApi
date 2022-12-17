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
export const searializeSongDetail = (res: SongDetailResponse): SongDetail => {
  const data = res.req_1.data.track_info;
  const info = res.req_1.info;
  return {
    id: data.id.toString(),
    name: data.name,
    picUrl: `https://y.qq.com/music/photo_new/T002R300x300M000${data.album.pmid}.jpg?max_age=2592000`,
    singer: data.singer.map((s) => ({ name: s.name, id: s.id.toString() })),
    publicTime: parseTimestamp(data.time_public),
    duration: data.interval,
    intro: info.intro.content?.[0].value || "",
    album: { name: data.album.name, id: data.album.id.toString() },
  };
};

export const searializeSongUrl = (res: SongUrlResponse): SongPlayUrl => ({
  url: res.req_1.data.midurlinfo.map((i) => i.purl),
});

export const searializeSongLyric = (res: SongLyricResponse): SongLyric => ({
  lyric: res.lyric || "",
  lyricExist: Boolean(res.lyric),
});

export const searializeSongItem = (item: SongInfo) => ({
  name: item.name,
  singerName: item.singer.map((s) => s.name),
  albumName: item.album.name,
  duration: item.interval,
  [Source.qq]: {
    id: item.id.toString(),
    singerId: item.singer.map((s) => s.id.toString()),
    albumId: item.album.id.toString(),
    playable:
      item.pay.pay_play !== 1 ||
      item.pay.pay_status === 1 ||
      item.pay.time_free === 1,
  },
});

export const searializeSongItemList = (data: SongInfo[]): SongItem[] => {
  const res: SongItem[] = [];
  for (const item of data) {
    res.push(searializeSongItem(item));
    if (item.grp?.length) {
      res.push(...item.grp.map(searializeSongItem));
    }
  }
  return res;
};
