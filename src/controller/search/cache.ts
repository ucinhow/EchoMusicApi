import {
  // Source,
  // SearchType,
  // SearchTypeData,
  // SrcMeta,
  SongItem,
  AlbumItem,
  SonglistItem,
} from "@/common/typing";
// import cache from "@/common/cache";
// import { calcSongItemKey } from "@/common/utils";
// import { SEARCH_ALBUM_PATH, SEARCH_SONG_PATH } from "@/common/constant";

// SearchType Data cache in path: SEARCH[TYPE].[COMMON|SOURCE]
// export type Song = {
//   [K in keyof typeof Source]: {
//     page: number;
//     size: number;
//     hasMore: boolean;
//     sum: number;
//   };
// } & {
//   cacheRes: SearchTypeData;
// };

export interface SongCache {
  // len: number;
  hasMore: boolean;
  data: Array<SongItem>;
}

export interface AlbumCache {
  // len: number;
  hasMore: boolean;
  data: Array<AlbumItem>;
}

export interface SonglistCache {
  // len: number;
  hasMore: boolean;
  data: Array<SonglistItem>;
}

// export const cacheSearchSong = (data: SearchSongCache) => {
//   cache.set("SEARCH-SONG-", SEARCH_SONG_PATH, data);
// };

// const initData = (type: SearchType): CacheData => ({
//   [Source.qq]: {
//     page: 0,
//     size: 100,
//     hasMore: true,
//     sum: 0,
//   },
//   [Source.joox]: {
//     page: 0,
//     size: 30,
//     hasMore: true,
//     sum: 0,
//   },
//   cacheRes: {
//     hasMore: false,
//     data: [],
//     type,
//   },
// });

// const get = async (keyword: string, type: SearchType): Promise<CacheData> => {
//   const key = `SEARCHTYPE-${type}:${keyword}`;
//   return (await cache.has(key)) ? await cache.get(key) : initData(type);
// };
// const getSearchSong = async (key: string): Promise<SongCache> => {
//   // const key = calcSongItemKey()
//   return (await cache.has(key, SEARCH_SONG_PATH))
//     ? await cache.get(key, [SEARCH_SONG_PATH])
//     : { offset: 0, hasMore: true, data: [] };
// };

// const cacheSearchSong = async (dat)

// const getSearchAlbum = async (key: string): Promise<AlbumCache> => {
//   return (await cache.has(key, SEARCH_ALBUM_PATH))
//     ? await cache.get(key, [SEARCH_ALBUM_PATH])
//     : { offset: 0, hasMore: true, data: [] };
// };

// const setSongItem = async (data: SongItem[]): Promise<boolean> => {

//   await cache.mset()
// }

// const set = async (val: CacheData, keyword: string, type: SearchType) => {
//   const key = `SEARCHTYPE-${type}:${keyword}`;
//   await cache.set(key, val);
// };

// const cacheSearchType = async (
//   data: SearchTypeData,
//   keyword: string,
//   type: SearchType,
//   src: Source | "ALL" = "ALL"
// ) => {

// };

// export default {
//   get,
//   set,
// };
