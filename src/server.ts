import Koa from "koa";
import { koaBody as bodyparser } from "koa-body";
import logger from "koa-logger";
import router from "@/controller/route";
import { AxiosError } from "axios";
import { DEVELOPMENT_ENV, ERROR_MSG } from "./common/constant";
import config from "./config";

const server = new Koa();
server.use(bodyparser());
server.use(logger());
server.use(router.allowedMethods()).use(router.routes());

server.on("error", (err, ctx) => {
  if (err instanceof AxiosError) {
    ctx.status = 500;
    ctx.message = "ServerError: request data error";
    config.env === DEVELOPMENT_ENV &&
      console.log(`ServerError: request data error(${err.message})`);
  } else if (err instanceof Error) {
    if (err.message === ERROR_MSG.ParamError) {
      ctx.status = 400;
      ctx.message = "ClientError: invalid params";
    } else {
      ctx.status = 500;
      config.env === DEVELOPMENT_ENV &&
        console.log(`ServerError: ${err.stack}`);
    }
  } else {
    ctx.status = 500;
    config.env === DEVELOPMENT_ENV && console.log(`ServerError: ${err}`);
  }
});

export default server;
