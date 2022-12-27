import {
  searchType as qqSearchType,
  searchSuggest as qqSuggestSearch,
  toplistAll as qqToplistAll,
  songlistDetail as qqSonglistDetail,
  toplistDetail as qqToplistDetail,
  songUrl as qqSongUrl,
  songLyric as qqSongLyric,
  songDetail as qqSongDetail,
  songlistRecommend as qqSonglistRecommend,
  banner as qqBanner,
  singerDetail as qqSingerDetail,
  songlistCategory as qqSonglistCategory,
  songlistList as qqSonglistList,
} from "./qq";

import {
  searchType as jooxSearchType,
  search as jooxSuggestSearch,
} from "./joox";

import { Source, INFOSource, SearchType, SearchTypeApi } from "@/common/typing";

export const searchType: Record<Source, SearchTypeApi> = {
  [Source.qq]: qqSearchType,
  [Source.joox]: (key: string, page: number, type: SearchType) =>
    jooxSearchType(key, type),
};

export const suggestSearch = {
  [Source.qq]: qqSuggestSearch,
  [Source.joox]: jooxSuggestSearch,
};

export const querySongDetail = {
  [INFOSource.qq]: qqSongDetail,
};

export const querySongUrl = {
  [INFOSource.qq]: qqSongUrl,
};

export const querySongLyric = {
  [INFOSource.qq]: qqSongLyric,
};

export const queryToplistAll = {
  [INFOSource.qq]: qqToplistAll,
};

export const queryToplistDetail = {
  [INFOSource.qq]: qqToplistDetail,
};

export const querySonglistDetail = {
  [INFOSource.qq]: qqSonglistDetail,
};

export const querySonglistRecommend = {
  [INFOSource.qq]: qqSonglistRecommend,
};

// export const querySongDetail: Record<Source, SongDetailApi> = {};

export const queryBanner = {
  [INFOSource.qq]: qqBanner,
};

export const querySingerDetail = {
  [INFOSource.qq]: qqSingerDetail,
};

export const querySonglistCategory = {
  [INFOSource.qq]: qqSonglistCategory,
};

export const querySonglistList = {
  [INFOSource.qq]: qqSonglistList,
};
