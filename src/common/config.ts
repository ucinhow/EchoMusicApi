import { readFileSync } from "fs";
import { DEVELOPMENT_ENV, PRODUCTION_ENV } from "./constant";

const configStr = readFileSync(`${process.cwd()}/config.json`, "utf-8");
const jsonObj = JSON.parse(configStr);
export const env = !~process.execArgv.findIndex((val) => val === "--dev")
  ? DEVELOPMENT_ENV
  : PRODUCTION_ENV;
export const cacheByRedis = jsonObj.cacheByRedis || false;
export const redisUrl = jsonObj.redisUrl || "redis://127.0.0.1:6379";
export const password = jsonObj.password || "";
