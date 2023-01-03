import { INFO_SOURCE } from "@/common/constant";
import { SearchAlbum } from "@/common/typing";
import { searchAlbum as search } from "@/feature";
import { mergeAlbumItem } from "@/common/utils";
import { AlbumCache } from "@/common/cache/fns";

const searchAlbum = async (input: string, page: number, size: number) => {
  const { data: cacheData, srcMeta } = await AlbumCache.get(input);
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
    const dataList: SearchAlbum[][] = await Promise.all(
      INFO_SOURCE.map(async (src) => {
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
    const datas = dataList.map(
      (list) =>
        list.reduce((acc, cur) => ({
          ...cur,
          data: acc.data.concat(cur.data),
        })),
      { data: [], hasMore: false, nextPage: 0 }
    );
    const listArr = datas.map((d) => d.data);
    const newHasMore = Boolean(~datas.findIndex(({ hasMore }) => hasMore));
    const newData = cacheData.concat(mergeAlbumItem(listArr));
    const newSrcMeta = { ...srcMeta };
    INFO_SOURCE.forEach((src, i) => {
      newSrcMeta[src] = {
        nextPage: datas[i].nextPage,
        hasMore: datas[i].hasMore,
      };
    });
    const newCache = new AlbumCache(newHasMore, newData, newSrcMeta);
    AlbumCache.set(input, newCache);
    // cache.set(input, SEARCH_ALBUM_PATH, newCache);
    return {
      hasMore: newHasMore || newData.length > end,
      data: newData.slice(start, end),
    };
  }
};

export default searchAlbum;
