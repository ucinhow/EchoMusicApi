import Router from "@koa/router";
import {
  completeListSongMeta,
  getSrcComplement,
  initINFOSrc,
} from "@/common/utils";
import { ERROR_MSG } from "@/common/constant";
import { queryAlbumDetail } from "@/feature";

const router = new Router();
// todo: router logic is not completed.
router.get("/detail", async (ctx, next) => {
  await next();
  const src = initINFOSrc(ctx.query.src);
  const { id } = ctx.query;
  if (typeof id !== "string") throw new Error(ERROR_MSG.ParamError);
  const res = await queryAlbumDetail[src](id);
  res.songlist = await completeListSongMeta(
    res.songlist,
    getSrcComplement(src)
  );
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
