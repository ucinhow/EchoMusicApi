import cache from "@/common/cache";
import {
  SEARCH_SONG_PATH,
  SOURCE,
  SEARCH_ALBUM_PATH,
  SEARCH_SONGLIST_PATH,
  INFO_SOURCE,
} from "@/common/constant";
import { SongCache, AlbumCache, SonglistCache } from "./cache";
import { searchType } from "@/feature";
import {
  SearchType,
  SongTypeData,
  AlbumTypeData,
  SonglistTypeData,
} from "@/common/typing";
import {
  mergeSongItem,
  mergeAlbumItem,
  mergeSonglistItem,
} from "@/common/utils";

export const searchSong = async (input: string, page: number, size: number) => {
  // get cache data if there is a cache, a empty structure otherwise.
  const { data: cacheData, hasMore }: SongCache = (await cache.has(
    input,
    SEARCH_SONG_PATH
  ))
    ? await cache.get(input, SEARCH_SONG_PATH)
    : { hasMore: true, data: [] };
  const end = page * size;
  const start = (page - 1) * size;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  } else {
    const dataList: SongTypeData[][] = [];
    SOURCE.forEach(async (src, i) => {
      let len = cacheLen;
      dataList.push([]);
      if (!hasMore) return;
      while (len < end) {
        const searchTypeData = (await searchType[src](
          input,
          ++page,
          SearchType.song
        )) as SongTypeData;
        len += searchTypeData.data.length;
        dataList[i].push(searchTypeData);
        // hasMores[i] = searchTypeData.hasMore;
        if (!searchTypeData.hasMore) break;
      }
    });
    const datas = dataList.map((list) =>
      list.reduce((acc, cur) => ({
        ...cur,
        data: acc.data.concat(cur.data),
      }))
    );
    const listArr = datas.map((d) => d.data);
    const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
    const newData = cacheData.concat(mergeSongItem(listArr));
    const newCache: SongCache = {
      data: newData,
      hasMore: newHasMore,
    };
    cache.set(input, SEARCH_SONG_PATH, newCache);
    return {
      hasMore: newHasMore || newData.length > end,
      data: newData.slice(start, end),
    };
  }
};

export const searchAlbum = async (
  input: string,
  page: number,
  size: number
) => {
  const { data: cacheData, hasMore }: AlbumCache = (await cache.has(
    input,
    SEARCH_SONG_PATH
  ))
    ? await cache.get(input, SEARCH_SONG_PATH)
    : { offset: 0, hasMore: true, data: [] };
  const end = page * size;
  const start = (page - 1) * size;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  } else {
    const dataList: AlbumTypeData[][] = [];
    SOURCE.forEach(async (src, i) => {
      let len = cacheLen;
      dataList.push([]);
      if (!hasMore) return;
      while (len < end) {
        const searchTypeData = (await searchType[src](
          input,
          ++page,
          SearchType.album
        )) as AlbumTypeData;
        len += searchTypeData.data.length;
        dataList[i].push(searchTypeData);
        // hasMores[i] = searchTypeData.hasMore;
        if (!searchTypeData.hasMore) break;
      }
    });
    const datas = dataList.map((list) =>
      list.reduce((acc, cur) => ({
        ...cur,
        data: acc.data.concat(cur.data),
      }))
    );
    const listArr = datas.map((d) => d.data);
    const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
    const newData = cacheData.concat(mergeAlbumItem(listArr));
    const newCache: AlbumCache = {
      data: newData,
      hasMore: newHasMore,
    };
    cache.set(input, SEARCH_ALBUM_PATH, newCache);
    return {
      hasMore: newHasMore || newData.length > end,
      data: newData.slice(start, end),
    };
  }
};

export const searchSonglist = async (
  input: string,
  page: number,
  size: number
) => {
  // get cache data if there is a cache, a empty structure otherwise.
  const { data: cacheData, hasMore }: SonglistCache = (await cache.has(
    input,
    SEARCH_SONG_PATH
  ))
    ? await cache.get(input, SEARCH_SONG_PATH)
    : { hasMore: true, data: [] };
  const end = page * size;
  const start = (page - 1) * size;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  } else {
    const dataList: SonglistTypeData[][] = [];
    INFO_SOURCE.forEach(async (src, i) => {
      let len = cacheLen;
      dataList.push([]);
      if (!hasMore) return;
      while (len < end) {
        const searchTypeData = (await searchType[src](
          input,
          ++page,
          SearchType.songlist
        )) as SonglistTypeData;
        len += searchTypeData.data.length;
        dataList[i].push(searchTypeData);
        // hasMores[i] = searchTypeData.hasMore;
        if (!searchTypeData.hasMore) break;
      }
    });
    const datas = dataList.map((list) =>
      list.reduce((acc, cur) => ({
        ...cur,
        data: acc.data.concat(cur.data),
      }))
    );
    const listArr = datas.map((d) => d.data);
    const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
    const newData = cacheData.concat(mergeSonglistItem(listArr));
    const newCache: SonglistCache = {
      data: newData,
      hasMore: newHasMore,
    };
    cache.set(input, SEARCH_SONGLIST_PATH, newCache);
    return {
      hasMore: newHasMore || newData.length > end,
      data: newData.slice(start, end),
    };
  }
};
