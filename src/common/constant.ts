import { INFOSource, Source } from "./typing/common";

export const SOURCE = [Source.qq, Source.joox];
export const INFO_SOURCE = [INFOSource.qq];
export enum ERROR_MSG {
  ParamError = "PARAM-ERROR",
  BannerJumpError = "BANNER-JUMP-ERROR",
}
export const SONGITEM_PATH = "SONGITEM";
export const SEARCH_SONG_PATH = "SEARCH-SONG";
export const SEARCH_ALBUM_PATH = "SEARCH-ALBUM";
export const SEARCH_SONGLIST_PATH = "SEARCH-SONGLIST";

export const DEVELOPMENT_ENV = "development";
