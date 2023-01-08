import Router from "@koa/router";
import { suggestSearch } from "@/feature";
import { isStr, mergeSSItem, isSearchType, str2Decimal } from "@/common/utils";
import { SearchType, SearchTypeResponse } from "@/common/typing";
import searchSong from "./searchSong";
import searchAlbum from "./searchAlbum";
import searchSonglist from "./searchSonglist";
import { ERROR_MSG, SEARCH_SUGGEST_SOURCE } from "@/common/constant";

const router = new Router();

router.get("/type", async (ctx, next) => {
  // await next();
  const {
    key,
    page: _page_ = "1",
    size: _size_ = "20",
    type: _type_,
  } = ctx.query;
  if (
    !isStr(key) ||
    !isStr(_page_) ||
    !isStr(_size_) ||
    !isStr(_type_) ||
    isSearchType(str2Decimal(_type_))
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const type = str2Decimal(_type_);

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
  // await next();
  const { key } = ctx.query;
  if (!isStr(key)) throw new Error(ERROR_MSG.ParamError);
  const pmsList = SEARCH_SUGGEST_SOURCE.map((src) => suggestSearch[src](key));
  const res = mergeSSItem(await Promise.all(pmsList));
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
