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
  albumDetail as qqAlbumDetail,
} from "./qq";

import {
  searchSong as jooxSearchSong,
  songUrl as jooxSongUrl,
  songLyric as jooxSongLyric,
  songDetail as jooxSongDetail,
} from "./joox";

import {
  searchSong as kwSearchSong,
  searchAlbum as kwSearchAlbum,
  searchSonglist as kwSearchSonglist,
  songUrl as kwSongUrl,
  songLyric as kwSongLyric,
  songDetail as kwSongDetail,
  albumDetail as kwAlbumDetail,
  singerDetail as kwSingerDetail,
  banner as kwBanner,
  toplistAll as kwToplistAll,
  toplistDetail as kwToplistDetail,
  songlistDetail as kwSonglistDetail,
  songlistCategory as kwSonglistCategory,
  songlistList as kwSonglistList,
  songlistRecommend as kwSonglistRecommend,
} from "./kuwo";

import { Source, PlaySource, SearchAlbum } from "@/common/typing";
import { str2Decimal } from "@/common/utils";

export const searchSong = {
  [PlaySource.qq]: qqSearchSong,
  [PlaySource.joox]: (key: string, page: number) => jooxSearchSong(key),
  [PlaySource.kw]: (key: string, page: number) => kwSearchSong(key, page, 50),
};

export const searchSonglist = {
  [Source.qq]: qqSearchSonglist,
  [Source.kw]: (key: string, page: number) => kwSearchSonglist(key, page, 50),
};

export const searchAlbum: Record<
  Source,
  (key: string, page: number) => Promise<SearchAlbum>
> = {
  [Source.qq]: qqSearchAlbum,
  [Source.kw]: (key: string, page: number) => kwSearchAlbum(key, page, 50),
};

export const suggestSearch = {
  [Source.qq]: qqSuggestSearch,
  // [Source.joox]: jooxSuggestSearch,
};

export const querySongDetail = {
  [PlaySource.qq]: qqSongDetail,
  [PlaySource.kw]: (id: string) => kwSongDetail(str2Decimal(id)),
  [PlaySource.joox]: jooxSongDetail,
};

export const querySongUrl = {
  [PlaySource.qq]: qqSongUrl,
  [PlaySource.joox]: jooxSongUrl,
  [PlaySource.kw]: (id: string) => kwSongUrl(str2Decimal(id)),
};

export const querySongLyric = {
  [PlaySource.qq]: qqSongLyric,
  [PlaySource.joox]: jooxSongLyric,
  [PlaySource.kw]: (id: string) => kwSongLyric(str2Decimal(id)),
};

export const queryToplistAll = {
  [Source.qq]: qqToplistAll,
  [Source.kw]: kwToplistAll,
};

export const queryToplistDetail = {
  [Source.qq]: qqToplistDetail,
  [Source.kw]: kwToplistDetail,
};

export const querySonglistDetail = {
  [Source.qq]: (id: string, page: number, size: number) =>
    qqSonglistDetail(str2Decimal(id), page, size),
  [Source.kw]: (id: string, page: number, size: number) =>
    kwSonglistDetail(str2Decimal(id), page, size),
};

// export const querySonglistItems = {
//   [Source.qq]: qqSonglistItems,
// };

export const querySonglistRecommend = {
  [Source.qq]: qqSonglistRecommend,
  [Source.kw]: kwSonglistRecommend,
};

// export const querySongDetail: Record<Source, SongDetailApi> = {};

export const querySonglistCategory = {
  [Source.qq]: qqSonglistCategory,
  [Source.kw]: kwSonglistCategory,
};

export const querySonglistList = {
  [Source.qq]: qqSonglistList,
  [Source.kw]: kwSonglistList,
};

export const queryAlbumDetail = {
  [Source.qq]: qqAlbumDetail,
  [Source.kw]: (id: string) => kwAlbumDetail(str2Decimal(id), 1, 100),
};

export const queryBanner = {
  [Source.qq]: qqBanner,
  [Source.kw]: kwBanner,
};

export const querySingerDetail = {
  [Source.qq]: qqSingerDetail,
  [Source.kw]: (id: string) => kwSingerDetail(str2Decimal(id)),
};
