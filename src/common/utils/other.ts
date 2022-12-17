import md5 from "md5";
import { Source, SongItem, INFOSource } from "../typing";
import { ERROR_MSG } from "../constant";
export const calcSongItemKey = (song: SongItem): string => {
  return md5(
    song.name + song.singerName.join("|") + song.albumName + song.duration
  );
};

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

export const initSrc = (str?: string | string[]): Source => {
  const temp = `${str}`;
  switch (temp) {
    case Source.joox:
      return Source.joox;
    case Source.qq:
      return Source.qq;
    default:
      throw new Error(ERROR_MSG.ParamError);
  }
};

export const initINFOSrc = (str?: string | string[]): INFOSource => {
  const temp = `${str}`;
  switch (temp) {
    case INFOSource.qq:
      return INFOSource.qq;
    default:
      throw new Error(ERROR_MSG.ParamError);
  }
};
