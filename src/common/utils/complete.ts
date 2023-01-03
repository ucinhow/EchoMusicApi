import { SongItem } from "../typing";
import searchSong from "@/controller/search/searchSong";
import { calcSongItemKey, limitAsyncExec } from "./other";
import { songItemCache } from "../cache";
import { SOURCE } from "../constant";

// todo: complete list song with cache logic
export const completeListSongMeta = async (
  list: SongItem[],
  srcList = SOURCE
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
  // return Promise.all(pmsList);
  // const srcStr = src.toString();
  // const srcList = SOURCE.filter((i) => i !== srcStr);
  // const pmsList: Promise<SearchSong>[] = [];
  // const map = new Map<string, SongItem>();
  // const res: SongItem[] = [];
  // for (const song of list) {
  //   const key = calcSongItemKey(song);
  //   if (await searchSongCache.has(key)) {
  //     res.push(...(await searchSongCache.get(key)).data);
  //   } else {
  //     map.set(key, song);
  //     const searchStr = `${song.name} ${song.singerName.join(" ")} ${
  //       song.albumName
  //     }`;
  //     srcList.forEach((s) => {
  //       pmsList.push(searchSong(searchStr, 1, 20));
  //     });
  //   }
  // }
  // const resList = await Promise.all(pmsList);
  // const datas = resList.map((res) => res.data);
  // traverseByHorizon(datas, (item, _, cut) => {
  //   const key = calcSongItemKey(item);
  //   if (map.has(key)) {
  //     const temp = map.get(key)!;
  //     map.set(key, {
  //       ...temp,
  //       ...item,
  //     });
  //     cut();
  //   }
  // });
  // res.push(...map.values());
  // cacheSongItems(res);
  // return res;
};
