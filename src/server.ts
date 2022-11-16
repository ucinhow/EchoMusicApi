import Koa from "koa";
import { koaBody as bodyparser } from "koa-body";
import logger from "koa-logger";
import router from "@/controller/route";
import { AxiosError } from "axios";

const app = new Koa();
app.use(bodyparser());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.on("error", (err, ctx) => {
  if (err instanceof AxiosError) {
    ctx.res.statusCode = err.status || 500;
    ctx.message = err.message;
    console.log(`数据请求错误: ${err.message}`);
  } else {
    console.log("服务端未知逻辑错误");
    ctx.res.statusCode = 500;
  }
  ctx.res.end();
});

const port = 3001;
export default app.listen(port, () =>
  console.log(`server running in localhost:${port}.`)
);
