import Koa, { Context } from "koa";
import { koaBody as bodyparser } from "koa-body";
import logger from "koa-logger";
import router from "@/controller/route";
import cors from "@koa/cors";
import { isAxiosError } from "axios";
import { ERROR_MSG } from "./common/constant";
import { devLog } from "./common/utils";

const server = new Koa();
server.use(cors({ credentials: true }));
server.use(bodyparser());
server.use(logger());
server.use(router.allowedMethods()).use(router.routes());

const errorHandler = (err: unknown, ctx: Context) => {
  if (isAxiosError(err)) {
    devLog(
      `ServerError: request data error(${err.message})`,
      `${err.response?.config.baseURL}${err.response?.config.url}`,
      err.response?.data
    );
    ctx.status = 500;
    ctx.message = "ServerError: request data error";
    return;
  }
  if (err instanceof Error) {
    switch (err.message) {
      case ERROR_MSG.ParamError: {
        devLog("ClientError: invalid params");
        ctx.status = 400;
        ctx.message = "ClientError: invalid params";
        return;
      }
      case ERROR_MSG.KuwoTokenError: {
        devLog("ServerError: kuwo csrf token error");
        ctx.status = 500;
        ctx.message = "ServerError: request data error";
        return;
      }
      case ERROR_MSG.BannerJumpError: {
        devLog(`ServerError: banner jump calc error`, err.stack);
        ctx.status = 500;
        return;
      }
    }
  }
  devLog(err);
  ctx.status = 500;
};

server.on("error", errorHandler);

export default server;
