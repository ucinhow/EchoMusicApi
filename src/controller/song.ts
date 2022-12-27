import Router from "@koa/router";
import { initINFOSrc } from "@/common/utils";
import { querySongDetail } from "@/feature";
import { ERROR_MSG } from "@/common/constant";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  ctx.response.body = await querySongDetail[src](id);
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
