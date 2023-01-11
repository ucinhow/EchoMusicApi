import { PlaySource, SongItem, Source } from "../typing";
import searchSong from "@/controller/search/searchSong";
import { calcSongItemKey, getSrcComplement, limitAsyncExec } from "./other";
import { songItemCache } from "../cache";

// todo: complete list song with cache logic
export const completeListSongMeta = async (
  list: SongItem[],
  currentSrc: PlaySource | Source
): Promise<SongItem[]> => {
  const ret = new Array<SongItem>(list.length);
  const taskList = list.map((item, idx) => async () => {
    const key = calcSongItemKey(item);
    if (await songItemCache.has(key)) {
      ret[idx] = { ...item, ...(await songItemCache.get(key)) };
      return;
    }
    const searchStr = `${item.name} ${item.singerName.join(" ")}`;
    const { data } = await searchSong(
      searchStr,
      1,
      10,
      getSrcComplement(currentSrc)
    );
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
  await limitAsyncExec(taskList, 5);
  return ret;
};
