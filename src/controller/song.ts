import Router from "@koa/router";
import { initINFOSrc, initSrc } from "@/common/utils";
import { querySongDetail, querySongLyric, querySongUrl } from "@/feature";
import { ERROR_MSG } from "@/common/constant";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const res = await querySongDetail[src](id);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/url", async (ctx) => {
  const src = initSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const res = await querySongUrl[src](id);
  const body = JSON.stringify(res);
  ctx.res.statusCode = 200;
  ctx.res.end(body);
});

router.get("/lyric", async (ctx) => {
  const src = initSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const res = await querySongLyric[src](id);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.res.end(body);
});

export default router;
