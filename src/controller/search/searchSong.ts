import { PLAYSOURCE } from "@/common/constant";
import { SongCache } from "@/common/cache";
import prepareData from "./songFns";
const searchSong = async (
  input: string,
  page: number,
  size: number,
  srcList = PLAYSOURCE
) => {
  const cache = await SongCache.get(input);
  const { data: cacheData } = cache;
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
  const [newData, polyHasMore] = await prepareData(
    input,
    cache,
    end,
    cacheLen,
    srcList
  );
  return {
    hasMore: polyHasMore || newData.length > end,
    data: newData.slice(start, end),
  };
};

export default searchSong;
