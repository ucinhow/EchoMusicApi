import { SearchType } from "@/typing";
import { get } from "../common";
import { ItemType, SearchResponse, SearchTypeResponse } from "./typing";
import { convertType, serializeSearch, serializeSearchType } from "./utils";
interface SearchParams {
  country: "hk";
  lang: "zh_CN"; // Joox doesn't support simplfied chinese, it will still response tranditional chinese.
  keyword: string;
}
type SearchTypeParams = SearchParams & { type: ItemType };

export const search = (keyword: string) =>
  get<SearchParams, SearchResponse>("/openjoox/v3/search", {
    params: {
      country: "hk",
      lang: "zh_cn",
      keyword,
    },
  }).then((res) => serializeSearch(res.data));

export const searchType = (keyword: string, type: SearchType) =>
  get<SearchTypeParams, SearchTypeResponse>("/openjoox/v3/search_type", {
    params: {
      country: "hk",
      lang: "zh_cn",
      keyword,
      type: convertType(type),
    },
  }).then((res) => serializeSearchType(res.data, type));
