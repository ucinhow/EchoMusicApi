import Router from "@koa/router";
import { Source } from "@/typing";
import { search as searchQQ } from "@/feature/qq";
import { search as searchJoox } from "@/feature/joox";
const router = new Router();
// todo: router logic is not completed.
router.get("/", async (ctx, next) => {
  await next();
  const { src, key } = ctx.query;
  if (typeof key !== "string") {
    ctx.res.statusCode = 400;
    ctx.message = "invalid params type: 'key'";
    ctx.res.end();
    return;
  }
  if (typeof src === "string") {
    switch (src) {
      case Source.qq: {
        ctx.response.body = await searchQQ(key);
        break;
      }
      case Source.joox: {
        ctx.response.body = await searchJoox(key);
        break;
      }
    }

    ctx.res.statusCode = 200;
    ctx.res.end();
  } else {
  }
});

export default router;
