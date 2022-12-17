import Router from "@koa/router";
import { queryToplistAll, queryToplistDetail } from "@/feature";
import { initINFOSrc } from "@/common/utils/other";
import { completeListSongMeta } from "@/common/utils/complete";
import { ERROR_MSG } from "@/common/constant";

const router = new Router();
// todo: router logic is not completed.
router.get("/all", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  ctx.response.body = await queryToplistAll[src]();
  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const { id } = ctx.query;
  const num = Number(ctx.query.num) || undefined;
  const offset = Number(ctx.query.offset) || 0;
  if (typeof id !== "string") {
    throw new Error(ERROR_MSG.ParamError);
  }
  const detail = await queryToplistDetail[src](id, offset, num);
  detail.songlist = await completeListSongMeta(detail.songlist, src);
  ctx.response.body = detail;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
