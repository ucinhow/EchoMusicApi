import { PlaySource, SongItem } from "@/common/typing";
import { searchSong } from "@/feature";
import { mergeSongItem } from "@/common/utils";
import { SongCache } from "@/common/cache";

interface RequestMeta {
  src: PlaySource;
  hasMore: boolean;
  nextPage: number;
}

const fetchMore = async (
  input: string,
  metaList: Array<RequestMeta>
): Promise<[SongItem[], Array<RequestMeta>]> => {
  const dataList: SongItem[][] = []; // store data result

  // fetch new data and return next request meta of srclist
  const newMetaList = await Promise.all(
    metaList.map(async ({ src, hasMore, nextPage }) => {
      if (!hasMore) return { hasMore: false, nextPage: 0, src };
      const rsp = await searchSong[src](input, nextPage);
      dataList.push(rsp.data);
      return { hasMore: rsp.hasMore, nextPage: rsp.nextPage, src };
    })
  );

  // flat the datalist of poly src
  const data = mergeSongItem(dataList);
  return [data, newMetaList];
};

const cacheSearchSong = (
  input: string,
  data: SongItem[],
  metaList: Array<RequestMeta>,
  srcMeta: SongCache["srcMeta"],
  polyHasMore: boolean
) => {
  const newSrcMeta = { ...srcMeta };
  for (const { src, hasMore, nextPage } of metaList) {
    newSrcMeta[src] = { hasMore, nextPage };
  }
  const newCache = new SongCache(polyHasMore, data, newSrcMeta);
  SongCache.set(input, newCache);
};

const prepareData = async (
  input: string,
  cache: SongCache,
  targetLen: number,
  currentLen: number,
  srcList: PlaySource[]
): Promise<[SongItem[], boolean]> => {
  // initial the args
  let hasMore = cache.hasMore;
  let validSrcList = srcList.filter((src) => cache.srcMeta[src].hasMore);
  let res = cache.data;
  let metaList: RequestMeta[] = validSrcList.map((src) => ({
    src,
    hasMore: cache.srcMeta[src].hasMore,
    nextPage: cache.srcMeta[src].nextPage,
  }));

  // exec cycle to fetch enough data or pause if has no more data
  while (currentLen < targetLen && hasMore) {
    const [data, newMetaList] = await fetchMore(input, metaList);
    metaList = newMetaList;
    currentLen += data.length;
    res = res.concat(data);
    hasMore = Boolean(~newMetaList.findIndex(({ hasMore }) => hasMore));
  }

  // cache the search song result
  cacheSearchSong(input, res, metaList, cache.srcMeta, hasMore);

  return [res, hasMore];
};

export default prepareData;
