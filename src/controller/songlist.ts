import Router from "@koa/router";
import { initINFOSrc } from "@/common/utils/other";
import { querySonglistDetail, querySonglistRecommend } from "@/feature";
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

export default router;
