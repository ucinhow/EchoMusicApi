import Router from "@koa/router";
import { isSource, isStr } from "@/common/utils/other";
import {
  querySonglistCategory,
  querySonglistDetail,
  querySonglistList,
  querySonglistRecommend,
} from "@/feature";
import { ERROR_MSG } from "@/common/constant";
import { str2Decimal } from "@/common/utils";

const router = new Router();

router.get("/detail", async (ctx) => {
  const { src, id, page: _page_ = "1", size: _size_ = "20" } = ctx.query;
  if (
    !isStr(id) ||
    !isStr(src) ||
    !isSource(src) ||
    !isStr(_page_) ||
    !isStr(_size_)
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const res = await querySonglistDetail[src](id, page, size);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/recommend", async (ctx) => {
  // await next();
  const { src } = ctx.query;
  if (!isStr(src) || !isSource(src)) throw new Error(ERROR_MSG.ParamError);
  const res = await querySonglistRecommend[src]();
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/menu", async (ctx) => {
  const { src } = ctx.query;
  if (!isStr(src) || !isSource(src)) throw new Error(ERROR_MSG.ParamError);
  const res = await querySonglistCategory[src]();
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

router.get("/list", async (ctx) => {
  const { page: _page_ = "1", size: _size_ = "20", id: _id_, src } = ctx.query;
  if (
    !isStr(_page_) ||
    !isStr(_size_) ||
    !isStr(_id_) ||
    !isStr(src) ||
    !isSource(src)
  )
    throw new Error(ERROR_MSG.ParamError);
  const page = str2Decimal(_page_);
  const size = str2Decimal(_size_);
  const id = str2Decimal(_id_);
  const res = await querySonglistList[src](id, page, size);
  const body = JSON.stringify(res);
  ctx.status = 200;
  ctx.body = body;
});

export default router;
