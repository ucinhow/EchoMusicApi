export const enum Source {
  qq = "qq",
  // netease = "netease",
  // kugou = "kugou",
  joox = "joox",
  // all = "ALL",
}
export type SrcMeta<T> = {
  [K in keyof typeof Source]?: T;
};
export enum DataType {
  songlist = 1,
  album = 2,
  song = 3,
  singer = 4,
  toplist = 5,
  // user = 7,
}

export const enum INFOSource {
  qq = "qq",
  // netease = Source.
}
