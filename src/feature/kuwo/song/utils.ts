import { LyricResponse, MusicItem, DetailResponse } from "./typing";
import { SongDetail, SongItem, SongLyric, SongPlayUrl } from "@/common/typing";
import { querySearchSinger } from "../search/request";
import { str2Decimal } from "@/common/utils";
export const completeArtistId = async (artist: string, artistId: number) => {
  const nameList = artist.split("&");
  const idList = await Promise.all(
    nameList.map(async (name, idx) => {
      if (idx === 0) return artistId;
      const resList = await querySearchSinger(name, 1, 20).then(
        (res) => res.data.data.list
      );
      for (const res of resList) {
        if (res.name === name) return res.id;
      }
      return -1;
    })
  );
  return [nameList, idList.map((id) => (id === -1 ? "" : id.toString()))];
};

export const serializeMusicItem = async (
  item: MusicItem
): Promise<SongItem> => {
  const [singerName, singerId] = await completeArtistId(
    item.artist,
    item.artistid
  );
  return {
    name: item.name,
    singerName,
    albumName: item.album,
    duration: item.duration,
    kw: {
      id: item.rid.toString(),
      singerId,
      albumId: item.albumid.toString(),
      playable: true,
    },
  };
};

export const serializeSongUrl = (url: string): SongPlayUrl => ({ url });

export const serializeSongLyric = (res: LyricResponse): SongLyric => {
  const { lrclist } = res.data;
  const lyricExist = Boolean(lrclist);
  if (!lyricExist)
    return {
      lyric: [[0, ""]],
      lyricExist,
    };

  const lyric: [number, string][] = lrclist.map(({ time, lineLyric }) => {
    const [s, ms] = time.split(".");
    const timeNum = str2Decimal(s) * 1000 + str2Decimal(ms) * 10;
    return [timeNum, lineLyric];
  });
  return {
    lyric,
    lyricExist,
  };
};

export const serializeDetail = (res: DetailResponse): SongDetail => {
  const {
    rid,
    name,
    pic: picUrl,
    artist,
    artistid,
    duration,
    album,
    albumid,
  } = res.data;
  return {
    id: rid.toString(),
    name,
    picUrl,
    singer: [{ name: artist, id: artistid.toString() }],
    publicTime: 0,
    duration: duration,
    album: { name: album, id: albumid.toString() },
  };
};
