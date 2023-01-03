import Router from "@koa/router";
import { getSrcComplement, initINFOSrc } from "@/common/utils/other";
import {
  querySonglistCategory,
  querySonglistDetail,
  querySonglistItems,
  querySonglistList,
  querySonglistRecommend,
} from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { completeListSongMeta } from "@/common/utils/complete";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  // await next();
  const src = initINFOSrc(ctx.query.src);
  // const offset = Number(ctx.query.offset) || 0;
  // const num = Number(ctx.query.num) || undefined;
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const detail = await querySonglistDetail[src](id);
  const body = JSON.stringify(detail);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/recommend", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const recommend = await querySonglistRecommend[src]();
  const body = JSON.stringify(recommend);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/cat", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const cat = await querySonglistCategory[src]();
  const body = JSON.stringify(cat);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/list", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const page = Number(ctx.query.page) || 0;
  const size = Number(ctx.query.size) || 20;
  const catId = Number(ctx.query.cateId);
  const res = await querySonglistList[src](catId, page, size);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/songItems", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const offset = Number(ctx.query.offset) || 0;
  const num = Number(ctx.query.num) || 20;
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const songlist = await querySonglistItems[src](id, offset, num);
  const res = completeListSongMeta(songlist, getSrcComplement(src));
  const body = JSON.stringify({ songlist: res });
  ctx.status = 200;
  ctx.body = body;
});

export default router;
