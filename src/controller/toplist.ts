import Router from "@koa/router";
import {
  queryToplistAll as queryQQToplistAll,
  queryToplistDetail,
} from "@/feature/qq";
import { queryToplistAll as queryNeteaseToplistAll } from "@/feature/netease";
import { Source } from "@/typing";

const router = new Router();
// todo: router logic is not completed.
router.get("/all", async (ctx, next) => {
  await next();
  const { src } = ctx.query;
  switch (src) {
    case Source.qq: {
      ctx.response.body = await queryQQToplistAll();
      break;
    }
    case Source.netease: {
      ctx.response.body = await queryNeteaseToplistAll();
      break;
    }
    default: {
    }
  }

  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/detail", async (ctx, next) => {
  await next();
  const { src, id } = ctx.query;
  switch (src) {
    case Source.qq: {
      ctx.response.body = await queryToplistDetail(Number(id));
    }
  }
  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
