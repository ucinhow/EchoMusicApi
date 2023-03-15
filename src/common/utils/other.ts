import md5 from "md5";
import { Source, SongItem, PlaySource, SearchType, AlbumItem } from "../typing";
import { DEVELOPMENT_ENV, PLAYSOURCE, SEARCHTYPE, SOURCE } from "../constant";
import { env } from "../config";
import * as OpenCC from "opencc-js";

export const calcSongItemKey = (song: SongItem): string =>
  md5(`${song.name}.${song.singerName.join("&")}.${song.albumName}`);

export const calcAlbumItemKey = (album: AlbumItem): string =>
  md5(`${album.name}.${album.singerName.join("&")}.${album.publicTime}`);

export const traverseByHorizon = <T>(
  lists: T[][],
  callback: (item: T, index: number, cut: () => void) => Promise<void> | void
) => {
  let i = 0;
  let overCount = 0;
  const temp = [...lists];
  while (overCount < temp.length) {
    for (let idx = 0; idx < temp.length; ++idx) {
      const list = temp[idx];
      if (i >= list.length) {
        overCount++;
        continue;
      }
      const item = list[i];
      const cut = () => temp.splice(idx, 1);
      callback(item, i, cut);
    }
    ++i;
  }
};

export interface Task<Rt> {
  (...args: any[]): Promise<Rt> | void;
}

export const limitAsyncExec = async (
  callbacks: Task<void>[],
  limit: number
) => {
  if (!callbacks.length) return [];
  let i = 0;
  const run = async (): Promise<void> => {
    if (i === callbacks.length) return Promise.resolve();
    await Promise.resolve(callbacks[i++]());
    return run();
  };
  const pmsList = new Array(limit)
    .fill(1)
    .map(() => Promise.resolve().then(run));
  return Promise.all(pmsList);
};

export const getSrcComplement = (src: Source | PlaySource) =>
  PLAYSOURCE.filter((s) => s !== src);

export const isStr = (p: string[] | string | undefined): p is string =>
  typeof p === "string";

export const isSearchType = (num: number): num is SearchType =>
  Boolean(~SEARCHTYPE.findIndex((type) => type === num));

export const isSource = (str: string): str is Source =>
  Boolean(~SOURCE.findIndex((src) => src === str));

export const isPlaySource = (str: string): str is PlaySource =>
  Boolean(~PLAYSOURCE.findIndex((src) => src === str));

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

export const devlog = (...args: any[]) =>
  env === DEVELOPMENT_ENV && console.log(...args);

export const parseSpace = (str: string) => str.replaceAll("&nbsp;", " ");

const converter = OpenCC.Converter({ from: "hk", to: "cn" });
export const zht2zhs = (str: string) => converter(str);
