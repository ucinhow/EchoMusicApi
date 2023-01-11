import { SOURCE } from "@/common/constant";
import { SearchSonglist } from "@/common/typing";
import { searchSonglist as search } from "@/feature";
import { mergeSonglistItem } from "@/common/utils";
import { SonglistCache } from "@/common/cache";

const searchSonglist = async (input: string, page: number, size: number) => {
  const { data: cacheData, srcMeta } = await SonglistCache.get(input);
  const end = page * size;
  const start = (page - 1) * size;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  }
  const dataList: SearchSonglist[][] = await Promise.all(
    SOURCE.map(async (src) => {
      let len = cacheLen;
      if (!srcMeta[src].hasMore) return [];
      let nextPage = srcMeta[src].nextPage;
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
    list.reduce((acc, cur) => ({
      ...cur,
      data: acc.data.concat(cur.data),
    }))
  );
  const listArr = datas.map((d) => d.data);
  const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
  const newData = cacheData.concat(mergeSonglistItem(listArr));
  const newSrcMeta = { ...srcMeta };
  SOURCE.forEach((src, i) => {
    const { nextPage, hasMore } = datas[i];
    newSrcMeta[src] = { nextPage, hasMore };
  });
  const newCache = new SonglistCache(newHasMore, newData, newSrcMeta);
  SonglistCache.set(input, newCache);
  return {
    hasMore: newHasMore || newData.length > end,
    data: newData.slice(start, end),
  };
};

export default searchSonglist;
