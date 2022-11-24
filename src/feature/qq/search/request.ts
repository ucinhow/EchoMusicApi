import { SearchType } from "@/typing";
import { AxiosResponse } from "axios";
// import { post } from "../common";
import { SearchResponse, SearchTypeResponse } from "./typing";
import {
  serializeSearch,
  createSearchTypeParams,
  serializeSearchType,
} from "./utils";
import { getMusicu, instanceC } from "../common";
// import { getSecuritySign } from "../common";
// import { SearchApi } from "@/typing";

export const search = (key: string) =>
  instanceC
    .get<
      SearchResponse,
      AxiosResponse<SearchResponse>,
      { key: string; utf8: number }
    >("/splcloud/fcgi-bin/smartbox_new.fcg", {
      params: {
        key,
        utf8: 1,
      },
    })
    .then((res) => serializeSearch(res.data));

type SearchTypeParams = ReturnType<typeof createSearchTypeParams>;

export const searchType = (
  key: string,
  page?: number,
  pageSize?: number,
  type: SearchType = SearchType.song
) =>
  getMusicu<SearchTypeParams, SearchTypeResponse>(
    createSearchTypeParams(key, page, pageSize, type)
  ).then((res) => serializeSearchType(res.data, type));
