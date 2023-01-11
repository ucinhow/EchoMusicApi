import {
  SuggestSearch,
  SSData,
  AlbumItem,
  SongItem,
  SonglistItem,
} from "@/common/typing";
import md5 from "md5";
import { songItemCache } from "../cache";
import { calcAlbumItemKey, calcSongItemKey, traverseByHorizon } from "./other";

/**
 * @description: function to merge suggest search data items from multi source.
 * @param {SuggestSearch} datas
 * @return {SuggestSearch} SuggestSearch data
 */
export const mergeSSItem = (datas: SuggestSearch[]): SuggestSearch => {
  const albumMap = new Map<string, SSData["album"]>();
  const singerMap = new Map<string, SSData["singer"]>();
  const songMap = new Map<string, SSData["song"]>();
  const songlists: SSData["songlist"][] = [];
  let i = 0;
  while (true) {
    let done = true;
    datas.forEach((data) => {
      if (data.album && i < data.album.length) {
        done = false;
        const album = data.album[i];
        const key = md5(album.name + album.singer);
        const item = albumMap.has(key)
          ? { ...albumMap.get(key)!, ...album }
          : album;
        albumMap.set(key, item);
      }
      if (data.song && i < data.song.length) {
        done = false;
        const song = data.song[i];
        const key = md5(song.name + song.singer);
        const item = songMap.has(key)
          ? { ...songMap.get(key)!, ...song }
          : song;
        songMap.set(key, item);
      }
      if (data.singer && i < data.singer.length) {
        done = false;
        const singer = data.singer[i];
        const key = singer.name;
        const item = singerMap.has(key)
          ? { ...singerMap.get(key)!, ...singer }
          : singer;
        singerMap.set(key, item);
      }
      if (data.songlist && i < data.songlist.length) {
        done = false;
        songlists.push(data.songlist[i]);
      }
    });
    if (done) break;
    ++i;
  }
  return {
    album: Array.from(albumMap.values()),
    singer: Array.from(singerMap.values()),
    song: Array.from(songMap.values()),
    songlist: songlists,
  };
};

// todo: need to add up the logic of cache data.
export const mergeSongItem = (datas: SongItem[][]) => {
  const map = new Map<string, SongItem>();
  traverseByHorizon<SongItem>(datas, (item) => {
    const key = calcSongItemKey(item);
    const temp = map.has(key) ? map.get(key)! : {};
    map.set(key, {
      ...temp,
      ...item,
    });
  });
  const ret = Array.from(map.values());
  songItemCache.mset(ret);
  return ret;
};

export const mergeAlbumItem = (datas: AlbumItem[][]) => {
  const map = new Map<string, AlbumItem>();
  traverseByHorizon<AlbumItem>(datas, (item) => {
    const key = calcAlbumItemKey(item);
    const temp = map.has(key) ? map.get(key)! : {};
    map.set(key, {
      ...temp,
      ...item,
    });
  });
  return Array.from(map.values());
};

export const mergeSonglistItem = (datas: SonglistItem[][]) => {
  const list: SonglistItem[] = [];
  traverseByHorizon<SonglistItem>(datas, (item) => {
    list.push(item);
  });
  return list;
};
