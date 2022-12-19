import Router from "@koa/router";
import { INFO_SOURCE } from "@/common/constant";
import { Banners } from "@/common/typing";
import { queryBanner } from "@/feature";

const router = new Router();

// todo: router logic is not completed.
router.get("/", async (ctx, next) => {
  await next();
  const pmsList: Promise<Banners>[] = [];
  INFO_SOURCE.forEach((src) => {
    pmsList.push(queryBanner[src]());
  });
  const data = await Promise.all(pmsList);
  const banners = data.reduce((acc, cur) => acc.concat(cur));
  ctx.response.body = banners;
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
