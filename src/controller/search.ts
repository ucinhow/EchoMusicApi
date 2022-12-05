import Router from "@koa/router";
import { Source } from "@/common/typing/common";
import { search as searchQQ } from "@/feature/qq";
import { search as searchJoox } from "@/feature/joox";
import { mergeSearchItem, mergeMultiSrc } from "@/common/utils";
import cache, { CacheData } from "@/common/cache/cacheSearch";
import { SearchType, SearchTypeData } from "@/common/typing/search";
import { searchType } from "@/feature";
const multiSrc = [Source.qq, Source.joox];

const initSearchType = (num: number): SearchType => {
  switch (num) {
    case SearchType.album:
      return SearchType.album;
    // case SearchType.singer:
    //   return SearchType.singer;
    case SearchType.songlist:
      return SearchType.songlist;
    case SearchType.song:
    default:
      return SearchType.song;
  }
};

const getResponseData = async (
  key: string,
  page: number,
  size: number,
  type: SearchType
) => {
  const cacheData = await cache.get(key, type);
  const end = page * size;
  const start = (page - 1) * size;
  if (cacheData.data.data.length >= end) {
    // cache data is enough.
    return {
      hasMore: cacheData.data.data.length > end,
      data: cacheData.data.data.slice(start, end),
    };
  } else {
    const dataList: SearchTypeData[][] = [];
    const pages: number[] = [];
    multiSrc.forEach(async (src, i) => {
      let page = cacheData[src].page;
      const size = cacheData[src].size;
      let len = page * size;
      dataList.push([]);
      if (cacheData[src].hasMore) {
        while (len < end) {
          const searchTypeData = await searchType[src](key, ++page, type);
          len += searchTypeData.data.length;
          dataList[i].push(searchTypeData);
          if (!searchTypeData.hasMore) break;
        }
      }

      pages.push(page);
    });
    const datas = dataList.map((list) =>
      list.reduce((acc, cur) => ({
        ...cur,
        data: [...acc.data, ...cur.data] as any,
      }))
    );

    const res = mergeMultiSrc(datas);
    const newDataList = [...(cacheData.data.data || []), ...res.data];
    const newCache: CacheData = {
      ...cacheData,
      data: {
        ...cacheData.data,
        ...res,
        data: newDataList as any,
      },
    };
    multiSrc.forEach((src, i) => {
      newCache[src].page = pages[i];
      newCache[src].hasMore = datas[i].hasMore;
    });
    cache.set(newCache, key, type);
    return {
      hasMore: res.hasMore || newDataList.length > end,
      data: newDataList.slice(start, end),
    };
  }
};

const router = new Router();
// todo: router logic is not completed.
router.get("/type", async (ctx, next) => {
  await next();
  const { key } = ctx.query;
  const page = Number(ctx.query.page) || 1;
  const size = Number(ctx.query.size) || 20;
  const type = initSearchType(Number(ctx.query.type));
  if (typeof key !== "string") {
    ctx.res.statusCode = 400;
    ctx.res.end();
    return;
  }
  const { data, hasMore } = await getResponseData(key, page, size, type);
  ctx.response.body = {
    data,
    hasMore,
    page,
    size,
  };
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/", async (ctx, next) => {
  await next();
  const { src, key } = ctx.query;
  if (typeof key !== "string") {
    ctx.res.statusCode = 400;
    ctx.message = "invalid params type: 'key'";
    ctx.res.end();
    return;
  }
  switch (src?.toString()) {
    case Source.qq: {
      ctx.response.body = await searchQQ(key);
      break;
    }
    case Source.joox: {
      ctx.response.body = await searchJoox(key);
      break;
    }
    default: {
      ctx.response.body = mergeSearchItem([
        await searchQQ(key),
        await searchJoox(key),
      ]);
    }
  }

  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
