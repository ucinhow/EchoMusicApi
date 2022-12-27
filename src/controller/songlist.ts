import Router from "@koa/router";
import { initINFOSrc } from "@/common/utils/other";
import {
  querySonglistCategory,
  querySonglistDetail,
  querySonglistList,
  querySonglistRecommend,
} from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { completeListSongMeta } from "@/common/utils/complete";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const offset = Number(ctx.query.offset) || 0;
  const num = Number(ctx.query.num) || undefined;
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const detail = await querySonglistDetail[src](id, offset, num);
  detail.songlist = await completeListSongMeta(detail.songlist, src);
  ctx.response.body = detail;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/recommend", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const recommend = await querySonglistRecommend[src]();
  ctx.response.body = recommend;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/category", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const cate = await querySonglistCategory[src]();
  ctx.response.body = cate;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/list", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const page = Number(ctx.query.page) || 0;
  const size = Number(ctx.query.size) || 20;
  const cateId = Number(ctx.query.cateId);
  const res = await querySonglistList[src](cateId, page, size);
  ctx.response.body = res;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
