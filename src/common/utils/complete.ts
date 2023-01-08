import { SongItem } from "../typing";
import searchSong from "@/controller/search/searchSong";
import { calcSongItemKey, limitAsyncExec } from "./other";
import { songItemCache } from "../cache";
import { PLAYSOURCE } from "../constant";

// todo: complete list song with cache logic
export const completeListSongMeta = async (
  list: SongItem[],
  srcList = PLAYSOURCE
): Promise<SongItem[]> => {
  const ret = new Array<SongItem>(list.length);
  const taskList = list.map((item, idx) => async () => {
    const key = calcSongItemKey(item);
    if (await songItemCache.has(key)) {
      ret[idx] = await songItemCache.get(key);
      return;
    }
    const searchStr = `${item.name} ${item.singerName.join(" ")}`;
    const { data } = await searchSong(searchStr, 1, 20, srcList);
    const map = new Map<string, SongItem>();
    map.set(key, item);
    data.forEach((i) => {
      const k = calcSongItemKey(i);
      if (k !== key) return;
      const temp = map.get(k)!;
      map.set(k, { ...temp, ...i });
    });
    ret[idx] = map.get(key)!;
  });
  await limitAsyncExec(taskList, 30);
  return ret;
};
