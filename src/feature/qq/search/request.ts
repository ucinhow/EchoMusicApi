import { AxiosResponse } from "axios";
import {
  SearchResponse,
  SearchType,
  SearchSongResponse,
  SearchAlbumResponse,
  SearchSonglistResponse,
} from "./typing";
import {
  serializeSearch,
  serializeSearchSong,
  serializeSearchAlbum,
  serializeSearchSonglist,
} from "./utils";
import { postMusicu, instanceC } from "../common";

const createSearchTypeParams = (key: string, page = 1, type: SearchType) => ({
  req_1: {
    method: "DoSearchForQQMusicDesktop",
    module: "music.search.SearchCgiService",
    param: {
      num_per_page: 50,
      page_num: page,
      query: key,
      search_type: type,
    },
  },
});

export const querySearchSuggest = (key: string) =>
  instanceC.get<
    SearchResponse,
    AxiosResponse<SearchResponse>,
    { key: string; utf8: number }
  >("/splcloud/fcgi-bin/smartbox_new.fcg", {
    params: {
      key,
      utf8: 1,
    },
  });

export const searchSuggest = (key: string) =>
  querySearchSuggest(key).then((res) => serializeSearch(res.data));

type SearchTypeParams = ReturnType<typeof createSearchTypeParams>;

export const querySearchSong = (key: string, page: number) =>
  postMusicu<SearchTypeParams, SearchSongResponse>(
    createSearchTypeParams(key, page, SearchType.song)
  );

export const searchSong = (key: string, page: number) =>
  querySearchSong(key, page).then((res) => serializeSearchSong(res.data));

export const querySearchAlbum = (key: string, page: number) =>
  postMusicu<SearchTypeParams, SearchAlbumResponse>(
    createSearchTypeParams(key, page, SearchType.album)
  );

export const searchAlbum = (key: string, page: number) =>
  querySearchAlbum(key, page).then((res) => serializeSearchAlbum(res.data));

export const querySearchSonglist = (key: string, page: number) =>
  postMusicu<SearchTypeParams, SearchSonglistResponse>(
    createSearchTypeParams(key, page, SearchType.songlist)
  );

export const searchSonglist = (key: string, page: number) =>
  querySearchSonglist(key, page).then((res) =>
    serializeSearchSonglist(res.data)
  );
