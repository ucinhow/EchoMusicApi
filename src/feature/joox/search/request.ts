import { SearchType } from "@/common/typing/search";
import { get } from "../common";
import {
  // ItemType,
  SearchResponse,
  SearchSongResponse,
  SearchTypeResponse,
} from "./typing";
import {
  convertType,
  pickSuggestSong,
  // serializeSearch,
  serializeSearchSong,
  serializeSearchType,
} from "./utils";
// interface SearchParams {
//   country: "hk";
//   lang: "zh_CN"; // Joox doesn't support simplfied chinese, it will still response tranditional chinese.
//   keyword: string;
// }
// type SearchTypeParams = SearchParams & { type: ItemType };

export const querySearchSuggest = (keyword: string) =>
  get<SearchResponse>("/openjoox/v3/search", {
    params: {
      country: "hk",
      lang: "zh_cn",
      keyword,
    },
  });

/**
 * @description: Joox source type search request function. If request success, server will return upto 30 results.
 * @param {string} key
 * @param {SearchType} type
 * @return SearchTypeData
 */
export const searchType = (key: string, type: SearchType = SearchType.song) =>
  get<SearchTypeResponse>("/openjoox/v2/search_type", {
    params: {
      country: "hk",
      lang: "zh_cn",
      key,
      type: convertType(type),
    },
  }).then((res) => serializeSearchType(res.data, type));

export const querySearchSong = (key: string) =>
  get<SearchSongResponse>("/openjoox/v2/search_type", {
    params: {
      country: "hk",
      lang: "zh_cn",
      key,
      type: 0,
    },
  });

export const searchSong = async (key: string) => {
  const songItems = await querySearchSuggest(key).then((res) =>
    pickSuggestSong(res.data)
  );
  const searchSongData = await querySearchSong(key).then((res) =>
    serializeSearchSong(res.data)
  );
  searchSongData.data = [...songItems, ...searchSongData.data];
  return searchSongData;
};
