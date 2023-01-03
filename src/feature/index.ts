import {
  // searchType as qqSearchType,
  searchSong as qqSearchSong,
  searchAlbum as qqSearchAlbum,
  searchSonglist as qqSearchSonglist,
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
  songlistItems as qqSonglistItems,
  albumDetail as qqAlbumDetail,
} from "./qq";

import {
  searchSong as jooxSearchSong,
  songUrl as jooxSongUrl,
  songLyric as jooxSongLyric,
} from "./joox";

import { Source, INFOSource } from "@/common/typing";

// export const searchType: Record<Source, SearchTypeApi> = {
//   [Source.qq]: qqSearchType,
//   [Source.joox]: (key: string, page: number, type: SearchType) =>
//     jooxSearchType(key, type),
// };
export const searchSong = {
  [Source.qq]: qqSearchSong,
  [Source.joox]: (key: string, page: number) => jooxSearchSong(key),
};

export const searchSonglist = {
  [INFOSource.qq]: qqSearchSonglist,
};

export const searchAlbum = {
  [INFOSource.qq]: qqSearchAlbum,
};

export const suggestSearch = {
  [INFOSource.qq]: qqSuggestSearch,
  // [Source.joox]: jooxSuggestSearch,
};

export const querySongDetail = {
  [INFOSource.qq]: qqSongDetail,
};

export const querySongUrl = {
  [Source.qq]: qqSongUrl,
  [Source.joox]: jooxSongUrl,
};

export const querySongLyric = {
  [Source.qq]: qqSongLyric,
  [Source.joox]: jooxSongLyric,
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

export const querySonglistItems = {
  [INFOSource.qq]: qqSonglistItems,
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

export const queryAlbumDetail = {
  [INFOSource.qq]: qqAlbumDetail,
};
