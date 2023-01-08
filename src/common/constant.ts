import { SearchType } from "./typing";
import { Source, PlaySource, SearchSuggestSource } from "./typing/common";

const getSourceList = () => Object.values(Source);
const getPlaySourceList = () => Object.values(PlaySource);
const getSearchTypeList = () => Object.values(SearchType);
const getSearchSuggestSourceList = () => Object.values(SearchSuggestSource);

export const SOURCE = getSourceList();
export const PLAYSOURCE = getPlaySourceList();
export const SEARCHTYPE = getSearchTypeList();
export const SEARCH_SUGGEST_SOURCE = getSearchSuggestSourceList();

export enum ERROR_MSG {
  ParamError = "PARAM-ERROR",
  BannerJumpError = "BANNER-JUMP-ERROR",
  KuwoTokenError = "KUWO-TOKEN-ERROR",
}
export const SONGITEM_PATH = "SONGITEM";
export const SEARCH_SONG_PATH = "SEARCH-SONG";
export const SEARCH_ALBUM_PATH = "SEARCH-ALBUM";
export const SEARCH_SONGLIST_PATH = "SEARCH-SONGLIST";

export const DEVELOPMENT_ENV = "development";
