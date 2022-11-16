import Router from "@koa/router";
import { querySingerList } from "@/feature/qq";
import { Source } from "@/typing";
// import { AxiosError } from "axios";
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

export default router;
