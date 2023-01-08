import Router from "@koa/router";
import { isSource, isStr } from "@/common/utils/other";
import {
  querySonglistCategory,
  querySonglistDetail,
  querySonglistList,
  querySonglistRecommend,
} from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { str2Decimal } from "@/common/utils";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  // await next();
  const { src, id, page: _page_ = "1", size: _size_ = "20" } = ctx.query;
  if (
    !isStr(id) ||
    !isStr(src) ||
    !isSource(src) ||
    !isStr(_page_) ||
    !isStr(_size_)
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const detail = await querySonglistDetail[src](id, page, size);
  const body = JSON.stringify(detail);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/recommend", async (ctx, next) => {
  // await next();
  const { src } = ctx.query;
  if (!isStr(src) || !isSource(src)) throw new Error(ERROR_MSG.ParamError);
  const recommend = await querySonglistRecommend[src]();
  const body = JSON.stringify(recommend);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/cat", async (ctx, next) => {
  // await next();
  const { src } = ctx.query;
  if (!isStr(src) || !isSource(src)) throw new Error(ERROR_MSG.ParamError);
  const cat = await querySonglistCategory[src]();
  const body = JSON.stringify(cat);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/list", async (ctx, next) => {
  // await next();
  const { page: _page_ = "1", size: _size_ = "20", id: _id_, src } = ctx.query;
  if (
    !isStr(_page_) ||
    !isStr(_size_) ||
    !isStr(_id_) ||
    !isStr(src) ||
    !isSource(src)
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const id = str2Decimal(_id_);
  const res = await querySonglistList[src](id, page, size);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

// router.get("/songItems", async (ctx, next) => {
//   // await next();
//   const { src, offset: _offset_ = "0", num: _num_ = "20", id } = ctx.query;
//   if (
//     !isStr(src) ||
//     !isSource(src) ||
//     !isStr(_offset_) ||
//     !isStr(_num_) ||
//     !isStr(id)
//   )
//     throw new Error(ERROR_MSG.ParamError);
//   const offset = str2Decimal(_offset_);
//   const num = str2Decimal(_num_);
//   const songlist = await querySonglistItems[src](id, offset, num);
//   const res = completeListSongMeta(songlist, getSrcComplement(src));
//   const body = JSON.stringify({ songlist: res });
//   ctx.status = 200;
//   ctx.body = body;
// });

export default router;
