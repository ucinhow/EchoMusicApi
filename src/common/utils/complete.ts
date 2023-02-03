import { SongItem } from "../typing";
import searchSong from "@/controller/search/searchSong";
import { calcSongItemKey, limitAsyncExec } from "./other";
import { songItemCache } from "../cache";
import { PLAYSOURCE } from "../constant";

export const completeListSongMeta = async (
  list: SongItem[]
): Promise<SongItem[]> => {
  const ret = new Array<SongItem>(list.length);
  const taskList = list.map((item, idx) => async () => {
    const key = calcSongItemKey(item);
    if (await songItemCache.has(key)) {
      ret[idx] = { ...item, ...(await songItemCache.get(key)) };
      return;
    }
    const searchStr = `${item.name} ${item.singerName.join(" ")}`;
    const unknownSrcList = PLAYSOURCE.filter((src) => item[src] === undefined);
    const { data } = await searchSong(searchStr, 1, 10, unknownSrcList);
    const index = data.findIndex((item) => {
      const itemKey = calcSongItemKey(item);
      return itemKey === key;
    });
    ret[idx] = ~index ? { ...data[index], ...item } : item;
  });
  await limitAsyncExec(taskList, 5);
  songItemCache.mset(ret);
  return ret;
};
