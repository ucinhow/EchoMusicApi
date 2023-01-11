import { get } from "../common";
import { SearchResponse, SearchSongResponse } from "./typing";
import { pickSuggestSong, serializeSearchSong } from "./utils";

export const querySearchSuggest = (keyword: string) =>
  get<SearchResponse>("/openjoox/v3/search", {
    params: {
      country: "hk",
      lang: "zh_cn",
      keyword,
    },
  });

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
