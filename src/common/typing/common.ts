export enum PlaySource {
  qq = "qq",
  joox = "joox",
  kw = "kw",
}

export enum Source {
  qq = "qq",
  kw = "kw",
}

export enum SearchSuggestSource {
  qq = "qq",
  // netease = "netease",
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
  mv = 6,
  // user = 7,
}
