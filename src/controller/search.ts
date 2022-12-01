import Router from "@koa/router";
import { Source } from "@/common/typing/common";
import { search as searchQQ, searchType as searchTypeQQ } from "@/feature/qq";
import {
  search as searchJoox,
  searchType as searchTypeJoox,
} from "@/feature/joox";
import { mergeSearchItem, mergeSearchType } from "@/common/utils";

const router = new Router();
// todo: router logic is not completed.
router.get("/type", async (ctx, next) => {
  await next();
  const { src, key } = ctx.query;
  const page = Number(ctx.query.page) || undefined;
  const pageSize = Number(ctx.query.pageSize) || undefined;
  const type = Number(ctx.query.type) || undefined;
  if (typeof key !== "string" || type === undefined) {
    ctx.res.statusCode = 400;
    ctx.res.end();
    return;
  }

  switch (src?.toString()) {
    case Source.qq: {
      ctx.response.body = await searchTypeQQ(key, page, pageSize, type);
      break;
    }
    case Source.joox: {
      ctx.response.body = await searchTypeJoox(key, type);
      break;
    }
    default: {
      ctx.response.body = mergeSearchType(
        [
          await searchTypeQQ(key, page, pageSize, type),
          await searchTypeJoox(key, type),
        ],
        type
      );
    }
  }

  ctx.res.statusCode = 200;
  ctx.res.end();
});

router.get("/", async (ctx, next) => {
  await next();
  const { src, key } = ctx.query;
  if (typeof key !== "string") {
    ctx.res.statusCode = 400;
    ctx.message = "invalid params type: 'key'";
    ctx.res.end();
    return;
  }
  switch (src?.toString()) {
    case Source.qq: {
      ctx.response.body = await searchQQ(key);
      break;
    }
    case Source.joox: {
      ctx.response.body = await searchJoox(key);
      break;
    }
    default: {
      ctx.response.body = mergeSearchItem([
        await searchQQ(key),
        await searchJoox(key),
      ]);
    }
  }

  ctx.res.statusCode = 200;
  ctx.res.end();
});

export default router;
