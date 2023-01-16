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
import md5 from "md5";

import {
  SongItem,
  AlbumItem,
  SonglistItem,
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

  static get = async (input: string) => {
    const key = md5(input);
    return (await cache.has(key, SEARCH_SONG_PATH))
      ? ((await cache.get(key, SEARCH_SONG_PATH)) as SongCache)
      : new SongCache();
  };

  static set = async (input: string, val: SongCache) =>
    cache.set(md5(input), SEARCH_SONG_PATH, val);
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
  static get = async (input: string) =>
    (await cache.has(md5(input), SEARCH_ALBUM_PATH))
      ? ((await cache.get(md5(input), SEARCH_ALBUM_PATH)) as AlbumCache)
      : new AlbumCache();

  static set = async (input: string, val: AlbumCache) =>
    cache.set(md5(input), SEARCH_ALBUM_PATH, val);
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

  static get = async (input: string) =>
    (await cache.has(md5(input), SEARCH_SONGLIST_PATH))
      ? ((await cache.get(md5(input), SEARCH_SONGLIST_PATH)) as SonglistCache)
      : new SonglistCache();

  static set = async (input: string, val: SonglistCache) =>
    cache.set(md5(input), SEARCH_SONGLIST_PATH, val);
}

export const songItemCache = {
  mset: async (data: SongItem[]) =>
    cache.mset(
      data.map((i) => [calcSongItemKey(i), i]),
      SONGITEM_PATH
    ),
  get: async (key: string) => (await cache.get(key, SONGITEM_PATH)) as SongItem,
  has: async (key: string) => cache.has(key, SONGITEM_PATH),
};
