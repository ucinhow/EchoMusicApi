import Router from "@koa/router";
import { queryToplistAll, queryToplistDetail } from "@/feature";
import { getSrcComplement, isSource, isStr } from "@/common/utils/other";
import { completeListSongMeta } from "@/common/utils/complete";
import { ERROR_MSG } from "@/common/constant";
import { str2Decimal } from "@/common/utils";

const router = new Router();
// todo: router logic is not completed.
router.get("/all", async (ctx, next) => {
  // await next();
  const { src } = ctx.query;
  if (!isStr(src) || !isSource(src)) throw new Error(ERROR_MSG.ParamError);
  const res = await queryToplistAll[src]();
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/detail", async (ctx, next) => {
  // await next();
  const { src, id: _id_, page: _page_ = "1", size: _size_ = "20" } = ctx.query;
  if (
    !isStr(src) ||
    !isSource(src) ||
    !isStr(_id_) ||
    !isStr(_page_) ||
    !isStr(_size_)
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const id = str2Decimal(_id_);
  const detail = await queryToplistDetail[src](id, page, size);
  detail.songlist = await completeListSongMeta(
    detail.songlist,
    getSrcComplement(src)
  );
  const body = JSON.stringify(detail);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
