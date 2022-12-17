import { SearchType, SongTypeData, INFOSource, SongItem } from "../typing";
import { searchType } from "@/feature";
import { SOURCE, SEARCH_SONG_PATH } from "../constant";
import { calcSongItemKey, traverseByHorizon } from "./other";
import cache from "../cache";
import { cacheSongItems } from "../cache/common";

export const completeListSongMeta = async (
  list: SongItem[],
  src: INFOSource
): Promise<SongItem[]> => {
  const srcStr = src.toString();
  const srcList = SOURCE.filter((i) => i !== srcStr);
  const pmsList: Promise<SongTypeData>[] = [];
  const map = new Map<string, SongItem>();
  const res: SongItem[] = [];
  for (const song of list) {
    const key = calcSongItemKey(song);
    if (await cache.has(key)) {
      res.push(await cache.get(key, SEARCH_SONG_PATH));
    } else {
      map.set(key, song);
      const searchInput = `${song.name} ${song.singerName.join(" ")} ${
        song.albumName
      }`;
      srcList.forEach((s) => {
        pmsList.push(
          searchType[s](
            searchInput,
            1,
            SearchType.song
          ) as Promise<SongTypeData>
        );
      });
    }
  }
  const resList = await Promise.all(pmsList);
  const datas = resList.map((res) => res.data);
  traverseByHorizon(datas, (item, _, cut) => {
    const key = calcSongItemKey(item);
    if (map.has(key)) {
      const temp = map.get(key)!;
      map.set(key, {
        ...temp,
        ...item,
      });
      cut();
    }
  });
  res.push(...map.values());
  cacheSongItems(res);
  return res;
};
