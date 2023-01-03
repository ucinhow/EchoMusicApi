import Router from "@koa/router";
import { queryToplistAll, queryToplistDetail } from "@/feature";
import { getSrcComplement, initINFOSrc } from "@/common/utils/other";
import { completeListSongMeta } from "@/common/utils/complete";
import { ERROR_MSG } from "@/common/constant";

const router = new Router();
// todo: router logic is not completed.
router.get("/all", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const res = await queryToplistAll[src]();
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const id = Number(ctx.query.id);

  // const num = Number(ctx.query.num) || 100;
  // const offset = Number(ctx.query.offset) || 0;
  // if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const detail = await queryToplistDetail[src](id);
  detail.songlist = await completeListSongMeta(
    detail.songlist,
    getSrcComplement(src)
  );
  const body = JSON.stringify(detail);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
