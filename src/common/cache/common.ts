import { SongItem } from "../typing";
import cache from ".";
import { SONGITEM_PATH } from "../constant";
import { calcSongItemKey } from "../utils";

export const cacheSongItems = async (data: SongItem[]) =>
  cache.mset(
    SONGITEM_PATH,
    data.map((i) => [calcSongItemKey(i), i])
  );
