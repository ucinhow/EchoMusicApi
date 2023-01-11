import cache from ".";
import {
  PLAYSOURCE,
  SEARCH_ALBUM_PATH,
  SEARCH_SONGLIST_PATH,
  SEARCH_SONG_PATH,
  SONGITEM_PATH,
  SOURCE,
} from "../constant";
import { calcSongItemKey } from "../utils";

import {
  SongItem,
  AlbumItem,
  SonglistItem,
  PlaySource,
  Source,
  SrcMeta,
  PlaySrcMeta,
} from "@/common/typing";

interface MetaType {
  nextPage: number;
  hasMore: boolean;
}

const createInitSrcMeta = () => {
  const obj: Record<string, MetaType> = {};
  SOURCE.forEach((src) => (obj[src] = { nextPage: 1, hasMore: true }));
  return obj as Required<SrcMeta<MetaType>>;
};

const createInitPlaySrcMeta = () => {
  const obj: Record<string, MetaType> = {};
  PLAYSOURCE.forEach((src) => (obj[src] = { nextPage: 1, hasMore: true }));
  return obj as Required<PlaySrcMeta<MetaType>>;
};

export class SongCache {
  hasMore;
  data;
  srcMeta;
  constructor(
    hasMore = true,
    data: Array<SongItem> = [],
    srcMeta = createInitPlaySrcMeta()
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
    srcMeta = createInitSrcMeta()
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
    srcMeta = createInitSrcMeta()
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
