import Router from "@koa/router";
import { suggestSearch } from "@/feature";
import { mergeSSItem } from "@/common/utils";
// import cache, { CacheData } from "@/controller/search/cache";
import { SearchType, SearchTypeResponse } from "@/common/typing";
import { searchSong, searchSonglist, searchAlbum } from "./searchData";
import { SOURCE } from "@/common/constant";
// import { searchType } from "@/feature";
// import { INFO_SOURCE } from "@/common/constant";
// const multiSrc = [Source.qq, Source.joox];

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
  // let data: SearchTypeData;
  const rsp: SearchTypeResponse = { data: [], hasMore: false, type };
  switch (type) {
    case SearchType.song: {
      const result = await searchSong(key, page, size);
      rsp.data = result.data;
      rsp.hasMore = result.hasMore;
      break;
    }

    case SearchType.album: {
      const result = await searchAlbum(key, page, size);
      rsp.data = result.data;
      rsp.hasMore = result.hasMore;
      break;
    }

    case SearchType.songlist: {
      const result = await searchSonglist(key, page, size);
      rsp.data = result.data;
      rsp.hasMore = result.hasMore;
      break;
    }
  }

  ctx.response.body = rsp;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/", async (ctx, next) => {
  await next();
  const { key } = ctx.query;
  if (typeof key !== "string") {
    ctx.res.statusCode = 400;
    ctx.message = "invalid params type: 'key'";
    ctx.res.end();
    return;
  }
  const pmsList = SOURCE.map((src) => suggestSearch[src](key));
  ctx.response.body = mergeSSItem(await Promise.all(pmsList));
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
