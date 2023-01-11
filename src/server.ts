import Koa, { Context } from "koa";
import { koaBody as bodyparser } from "koa-body";
import logger from "koa-logger";
import router from "@/controller/route";
import { isAxiosError } from "axios";
import { DEVELOPMENT_ENV, ERROR_MSG } from "./common/constant";
import config from "./common/config";

const server = new Koa();
server.use(bodyparser());
server.use(logger());
server.use(router.allowedMethods()).use(router.routes());

const errorHandler = (err: unknown, ctx: Context) => {
  if (isAxiosError(err)) {
    config.env === DEVELOPMENT_ENV &&
      console.log(
        `ServerError: request data error(${err.message})`,
        `${err.response?.config.baseURL}/${err.response?.config.url}`
      );
    ctx.status = 500;
    ctx.message = "ServerError: request data error";
    return;
  }
  if (err instanceof Error) {
    switch (err.message) {
      case ERROR_MSG.ParamError: {
        ctx.status = 400;
        ctx.message = "ClientError: invalid params";
        return;
      }
      case ERROR_MSG.KuwoTokenError: {
        config.env === DEVELOPMENT_ENV &&
          console.log("ServerError: kuwo csrf token error");
        ctx.status = 500;
        ctx.message = "ServerError: request data error";
        return;
      }
      case ERROR_MSG.BannerJumpError: {
        config.env === DEVELOPMENT_ENV &&
          console.log(`ServerError: banner jump calc error`, err.stack);
        ctx.status = 500;
        return;
      }
    }
  }
  config.env === DEVELOPMENT_ENV && console.log(err);
  ctx.status = 500;
};

server.on("error", errorHandler);

export default server;
