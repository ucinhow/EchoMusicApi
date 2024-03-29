import { LyricResponse, MusicItem, DetailResponse } from "./typing";
import { SongDetail, SongItem, SongLyric, SongPlayUrl } from "@/common/typing";
import { querySearchSinger } from "../search/request";
import { limitAsyncExec, parseSpace, str2Decimal } from "@/common/utils";
export const completeArtistId = async (artist: string, artistId: number) => {
  const nameList = artist.split("&");
  const idList = new Array<number>(nameList.length);
  const taskList = nameList.map((name, idx) => async () => {
    if (idx === 0) {
      idList[idx] = artistId;
      return;
    }
    const resList = await querySearchSinger(name, 1, 5).then(
      (res) => res.data.data.list
    );
    for (const res of resList) {
      if (res.name === name) {
        idList[idx] = res.id;
        return;
      }
    }
    idList[idx] = -1;
  });
  // await limitAsyncExec(taskList, 2);
  await Promise.all(taskList);
  return [nameList, idList.map((id) => (id === -1 ? "" : id.toString()))];
};

export const serializeMusicItem = async (
  item: MusicItem
): Promise<SongItem> => {
  const [singerName, singerId] = await completeArtistId(
    item.artist,
    item.artistid
  );
  const { name, album: albumName, duration, albumid } = item;
  return {
    name: parseSpace(name),
    singerName: singerName.map((s) => parseSpace(s)),
    albumName: parseSpace(albumName),
    duration,
    kw: {
      id: item.rid.toString(),
      singerId,
      albumId: albumid.toString(),
      playable: true,
    },
  };
};

export const serializeItemList = async (itemList: MusicItem[]) => {
  return Promise.all(
    itemList.map(async (item) => await serializeMusicItem(item))
  );
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
    name: parseSpace(name),
    picUrl,
    singer: [{ name: parseSpace(artist), id: artistid.toString() }],
    publicTime: 0,
    duration: duration,
    album: { name: parseSpace(album), id: albumid.toString() },
  };
};
