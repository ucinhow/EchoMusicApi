import { SearchType } from "@/common/typing/search";
import { get } from "../common";
import { ItemType, SearchResponse, SearchTypeResponse } from "./typing";
import { convertType, serializeSearch, serializeSearchType } from "./utils";
interface SearchParams {
  country: "hk";
  lang: "zh_CN"; // Joox doesn't support simplfied chinese, it will still response tranditional chinese.
  keyword: string;
}
// type SearchTypeParams = SearchParams & { type: ItemType };

export const search = (keyword: string) =>
  get<SearchResponse>("/openjoox/v3/search", {
    params: {
      country: "hk",
      lang: "zh_cn",
      keyword,
    },
  }).then((res) => serializeSearch(res.data));

/**
 * @description: Joox source type search request function. If request success, server will return upto 30 results.
 * @param {string} key
 * @param {SearchType} type
 * @return SearchTypeData
 */
export const searchType = (key: string, type: SearchType = SearchType.song) =>
  get<SearchTypeResponse>("/openjoox/v3/search_type", {
    params: {
      country: "hk",
      lang: "zh_cn",
      key,
      type: convertType(type),
    },
  }).then((res) => serializeSearchType(res.data, type));
