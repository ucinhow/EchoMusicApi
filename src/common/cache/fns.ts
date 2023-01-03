import cache from ".";
import {
  SEARCH_ALBUM_PATH,
  SEARCH_SONGLIST_PATH,
  SEARCH_SONG_PATH,
  SONGITEM_PATH,
} from "../constant";
import { calcSongItemKey } from "../utils";

import {
  SongItem,
  AlbumItem,
  SonglistItem,
  SrcMeta,
  INFOSrcMeta,
} from "@/common/typing";

export class SongCache {
  hasMore;
  data;
  srcMeta;
  constructor(
    hasMore = true,
    data: Array<SongItem> = [],
    srcMeta: Required<SrcMeta<{ nextPage: number; hasMore: boolean }>> = {
      qq: { nextPage: 1, hasMore: true },
      joox: { nextPage: 1, hasMore: true },
    }
  ) {
    this.hasMore = hasMore;
    this.data = data;
    this.srcMeta = srcMeta;
  }

  static get = async (key: string) =>
    (await cache.has(key, SEARCH_SONG_PATH))
      ? (cache.get(key, SEARCH_SONG_PATH) as SongCache)
      : new SongCache();

  static set = async (key: string, val: SongCache) =>
    cache.set(key, val, SEARCH_SONG_PATH);
}

export class AlbumCache {
  hasMore;
  data;
  srcMeta;
  constructor(
    hasMore: boolean = true,
    data: Array<AlbumItem> = [],
    srcMeta: Required<INFOSrcMeta<{ nextPage: number; hasMore: boolean }>> = {
      qq: { nextPage: 1, hasMore: true },
    }
  ) {
    this.hasMore = hasMore;
    this.data = data;
    this.srcMeta = srcMeta;
  }
  static get = async (key: string) =>
    (await cache.has(key, SEARCH_ALBUM_PATH))
      ? (cache.get(key, SEARCH_ALBUM_PATH) as AlbumCache)
      : new AlbumCache();

  static set = async (key: string, val: AlbumCache) =>
    cache.set(key, val, SEARCH_ALBUM_PATH);
}

export class SonglistCache {
  hasMore;
  data;
  srcMeta;
  constructor(
    hasMore: boolean = true,
    data: Array<SonglistItem> = [],
    srcMeta: Required<INFOSrcMeta<{ nextPage: number; hasMore: boolean }>> = {
      qq: { nextPage: 1, hasMore: true },
    }
  ) {
    this.hasMore = hasMore;
    this.data = data;
    this.srcMeta = srcMeta;
  }

  static get = async (key: string) =>
    (await cache.has(key, SEARCH_SONGLIST_PATH))
      ? (cache.get(key, SEARCH_SONGLIST_PATH) as SonglistCache)
      : new SonglistCache();

  static set = async (key: string, val: SonglistCache) =>
    cache.set(key, val, SEARCH_SONGLIST_PATH);
}

export const songItemCache = {
  mset: async (data: SongItem[]) =>
    cache.mset(
      data.map((i) => [calcSongItemKey(i), i]),
      SONGITEM_PATH
    ),
  get: async (key: string) => cache.get(key, SONGITEM_PATH) as SongItem,
  has: async (key: string) => cache.has(key, SONGITEM_PATH),
};
