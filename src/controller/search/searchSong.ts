import { PLAYSOURCE } from "@/common/constant";
import { SearchSong } from "@/common/typing";
import { searchSong as search } from "@/feature";
import { mergeSongItem } from "@/common/utils";
import { SongCache } from "@/common/cache";
const searchSong = async (
  input: string,
  page: number,
  size: number,
  srcList = PLAYSOURCE
) => {
  const { data: cacheData, srcMeta } = await SongCache.get(input);
  const end = page * size;
  const start = (page - 1) * size;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  } else {
    const dataList: SearchSong[][] = await Promise.all(
      srcList.map(async (src, idx) => {
        let len = cacheLen;
        if (!srcMeta[idx].hasMore) return [];
        let nextPage = srcMeta[idx].nextPage;
        const ret = [];
        while (len < end) {
          const searchTypeData = await search[src](input, nextPage++);
          len += searchTypeData.data.length;
          ret.push(searchTypeData);
          if (!searchTypeData.hasMore) break;
        }
        return ret;
      })
    );
    const datas = dataList.map((list) =>
      list.reduce(
        (acc, cur) => ({
          ...cur,
          data: acc.data.concat(cur.data),
        }),
        { hasMore: false, data: [], nextPage: 0 }
      )
    );
    const songItems = mergeSongItem(datas.map((d) => d.data));
    const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
    const newData = cacheData.concat(songItems);
    const newSrcMeta = srcList.map((src, i) => ({
      nextPage: datas[i].nextPage,
      hasMore: datas[i].hasMore,
    }));
    const newCache = new SongCache(newHasMore, newData, newSrcMeta);
    SongCache.set(input, newCache);
    return {
      hasMore: newHasMore || newData.length > end,
      data: newData.slice(start, end),
    };
  }
};

export default searchSong;
