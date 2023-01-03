import Router from "@koa/router";
import { INFO_SOURCE } from "@/common/constant";
import { Banners } from "@/common/typing";
import { queryBanner } from "@/feature";

const router = new Router();

// todo: router logic is not completed.
router.get("/", async (ctx, next) => {
  //   await next();
  const pmsList: Promise<Banners>[] = [];
  INFO_SOURCE.forEach((src) => {
    pmsList.push(queryBanner[src]());
  });
  const data = await Promise.all(pmsList);
  const banners = data.reduce((acc, cur) => acc.concat(cur));
  const body = JSON.stringify({ banners });
  ctx.status = 200;
  ctx.body = body;
});

export default router;
