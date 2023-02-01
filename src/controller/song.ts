import Router from "@koa/router";
import { querySongDetail, querySongLyric, querySongUrl } from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { isSource, isStr, isPlaySource } from "@/common/utils";

const router = new Router();
router.get("/detail", async (ctx) => {
  const { id, src } = ctx.query;
  if (!isStr(id) || !isStr(src) || !isPlaySource(src))
    throw new Error(ERROR_MSG.ParamError);
  const res = await querySongDetail[src](id);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/url", async (ctx) => {
  const { id, src } = ctx.query;
  if (!isStr(id) || !isStr(src) || !isPlaySource(src))
    throw new Error(ERROR_MSG.ParamError);
  const res = await querySongUrl[src](id);
  const body = JSON.stringify(res);
  ctx.res.statusCode = 200;
  ctx.res.end(body);
});

router.get("/lyric", async (ctx) => {
  const { id, src } = ctx.query;
  if (!isStr(id) || !isStr(src) || !isPlaySource(src))
    throw new Error(ERROR_MSG.ParamError);
  const res = await querySongLyric[src](id);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.res.end(body);
});

export default router;
