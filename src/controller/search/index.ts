import Router from "@koa/router";
import { suggestSearch } from "@/feature";
import { mergeSSItem } from "@/common/utils";
import { SearchType, SearchTypeResponse } from "@/common/typing";
import searchSong from "./searchSong";
import searchAlbum from "./searchAlbum";
import searchSonglist from "./searchSonglist";
import { ERROR_MSG, INFO_SOURCE } from "@/common/constant";

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
  // await next();
  const { key } = ctx.query;
  const page = Number(ctx.query.page) || 1;
  const size = Number(ctx.query.size) || 20;
  const type = initSearchType(Number(ctx.query.type));
  if (typeof key !== "string") throw new Error(ERROR_MSG.ParamError);

  const rsp: SearchTypeResponse = { data: [], hasMore: false, type };
  switch (type) {
    case SearchType.song: {
      const { data, hasMore } = await searchSong(key, page, size);
      rsp.data = data;
      rsp.hasMore = hasMore;
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
  const body = JSON.stringify(rsp);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/suggest", async (ctx, next) => {
  await next();
  const { key } = ctx.query;
  if (typeof key !== "string") throw new Error(ERROR_MSG.ParamError);

  const pmsList = INFO_SOURCE.map((src) => suggestSearch[src](key));
  const res = mergeSSItem(await Promise.all(pmsList));
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
