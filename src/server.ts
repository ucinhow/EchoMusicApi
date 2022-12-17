import Koa from "koa";
import { koaBody as bodyparser } from "koa-body";
import logger from "koa-logger";
import router from "@/controller/route";
import { AxiosError } from "axios";
import { ERROR_MSG } from "./common/constant";

const app = new Koa();
app.use(bodyparser());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.on("error", (err, ctx) => {
  if (err instanceof AxiosError) {
    ctx.res.statusCode = err.status || 500;
    ctx.message = "ServerError: request data error";
    console.log(`数据请求错误: ${err.message}`);
  } else if (err instanceof Error) {
    if (err.message === ERROR_MSG.ParamError) {
      ctx.res.statusCode = 400;
      ctx.message = "ClientError: invalid params";
    }
  } else {
    ctx.res.statusCode = 500;
    console.log("服务端未知逻辑错误");
  }
  ctx.res.end();
});

const port = 3001;
export default app.listen(port, () =>
  console.log(`server running in localhost:${port}.`)
);
