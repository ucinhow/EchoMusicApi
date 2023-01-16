import Router from "@koa/router";
import { querySingerDetail } from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { isSource, isStr } from "@/common/utils";
const router = new Router();

router.get("/detail", async (ctx) => {
  const { src, id } = ctx.query;
  if (!isStr(src) || !isStr(id) || !isSource(src))
    throw new Error(ERROR_MSG.ParamError);
  const res = await querySingerDetail[src](id);
  const body = JSON.stringify(res);
  ctx.res.statusCode = 200;
  ctx.res.end(body);
});

export default router;
