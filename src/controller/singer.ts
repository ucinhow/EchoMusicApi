import Router from "@koa/router";
import { querySingerList } from "@/feature/qq";
import { Source } from "@/common/typing";
import { initINFOSrc } from "@/common/utils";
import { querySingerDetail } from "@/feature";
import { ERROR_MSG } from "@/common/constant";
const router = new Router();
// todo: router logic is not completed.
router.get("/list", async (ctx, next) => {
  await next();
  const { src } = ctx.query;

  switch (src) {
    case Source.qq: {
      ctx.response.body = await querySingerList();
    }
  }

  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  ctx.response.body = await querySingerDetail[src](id);
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
