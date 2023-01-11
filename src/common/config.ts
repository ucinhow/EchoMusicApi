import { readFileSync } from "fs";
import { DEVELOPMENT_ENV, PRODUCTION_ENV } from "./constant";

interface Config {
  env: string;
  cacheByRedis: boolean;
  redisUrl: string;
}

const configStr = readFileSync(`${process.cwd()}/config.json`, "utf-8");
const jsonObj = JSON.parse(configStr);
const env = !~process.execArgv.findIndex((val) => val === "--dev")
  ? DEVELOPMENT_ENV
  : PRODUCTION_ENV;
const config: Config = {
  env,
  cacheByRedis: jsonObj.cacheByRedis || false,
  redisUrl: jsonObj.redisUrl || "redis://127.0.0.1:6379",
};

export default config;
