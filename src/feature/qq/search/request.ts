import { SearchType } from "@/common/typing/search";
import { AxiosResponse } from "axios";
import { SearchResponse, SearchTypeResponse } from "./typing";
import { serializeSearch, serializeSearchType, convertType } from "./utils";
import { postMusicu, instanceC } from "../common";

const createSearchTypeParams = (
  key: string,
  page = 1,
  type: SearchType = SearchType.song
) => ({
  req_1: {
    method: "DoSearchForQQMusicDesktop",
    module: "music.search.SearchCgiService",
    param: {
      num_per_page: 100,
      page_num: page,
      query: key,
      search_type: convertType(type),
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
export const querySearchType = (
  key: string,
  page: number,
  type: SearchType = SearchType.song
) =>
  postMusicu<SearchTypeParams, SearchTypeResponse>(
    createSearchTypeParams(key, page, type)
  );

export const searchType = (
  key: string,
  page: number,
  type: SearchType = SearchType.song
) =>
  querySearchType(key, page, type).then((res) =>
    serializeSearchType(res.data, type)
  );
