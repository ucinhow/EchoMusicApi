import { AlbumCache } from "@/common/cache/fns";
import prepareData from "./albumFns";
const searchAlbum = async (input: string, page: number, size: number) => {
  const cache = await AlbumCache.get(input);
  const end = page * size;
  const start = (page - 1) * size;
  const cacheData = cache.data;
  const cacheLen = cacheData.length;
  if (cacheLen >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.length > end,
      data: cacheData.slice(start, end),
    };
  }
  const [newData, polyHasMore] = await prepareData(input, cache, end, cacheLen);
  return {
    hasMore: polyHasMore || newData.length > end,
    data: newData.slice(start, end),
  };
};

export default searchAlbum;
