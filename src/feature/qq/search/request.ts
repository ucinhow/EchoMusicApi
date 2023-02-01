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

/**
 * @description: qq source searchType request, it will return upto 100 results if request success.
 * @return SearchTypeData
 */
export const querySearchType = <Rsp>(
  key: string,
  page: number,
  type: SearchType
) => postMusicu<SearchTypeParams, Rsp>(createSearchTypeParams(key, page, type));

export const searchSong = (key: string, page: number) =>
  querySearchType<SearchSongResponse>(key, page, SearchType.song).then((res) =>
    serializeSearchSong(res.data)
  );

export const searchAlbum = (key: string, page: number) =>
  querySearchType<SearchAlbumResponse>(key, page, SearchType.album).then(
    (res) => serializeSearchAlbum(res.data)
  );

export const searchSonglist = (key: string, page: number) =>
  querySearchType<SearchSonglistResponse>(key, page, SearchType.songlist).then(
    (res) => serializeSearchSonglist(res.data)
  );
