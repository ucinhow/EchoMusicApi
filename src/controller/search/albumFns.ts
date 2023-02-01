import { Source, AlbumItem } from "@/common/typing";
import { searchAlbum } from "@/feature";
import { mergeAlbumItem } from "@/common/utils";
import { AlbumCache } from "@/common/cache";
import { SOURCE } from "@/common/constant";

interface RequestMeta {
  src: Source;
  hasMore: boolean;
  nextPage: number;
}

const fetchMore = async (
  input: string,
  metaList: Array<RequestMeta>
): Promise<[AlbumItem[], Array<RequestMeta>]> => {
  const dataList: AlbumItem[][] = []; // store data result

  // fetch new data and return next request meta of srclist
  const newMetaList = await Promise.all(
    metaList.map(async ({ src, hasMore, nextPage }) => {
      if (!hasMore) return { hasMore: false, nextPage: 0, src };
      const rsp = await searchAlbum[src](input, nextPage);
      dataList.push(rsp.data);
      return { hasMore: rsp.hasMore, nextPage: rsp.nextPage, src };
    })
  );

  // flat the datalist of poly src
  const data = mergeAlbumItem(dataList);
  return [data, newMetaList];
};

const cacheSearchAlbum = (
  input: string,
  data: AlbumItem[],
  metaList: Array<RequestMeta>,
  srcMeta: AlbumCache["srcMeta"],
  polyHasMore: boolean
) => {
  const newSrcMeta = { ...srcMeta };
  for (const { src, hasMore, nextPage } of metaList) {
    newSrcMeta[src] = { hasMore, nextPage };
  }
  const newCache = new AlbumCache(polyHasMore, data, newSrcMeta);
  AlbumCache.set(input, newCache);
};

const prepareData = async (
  input: string,
  cache: AlbumCache,
  targetLen: number,
  currentLen: number,
  srcList = SOURCE
): Promise<[AlbumItem[], boolean]> => {
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
  cacheSearchAlbum(input, res, metaList, cache.srcMeta, hasMore);

  return [res, hasMore];
};

export default prepareData;
