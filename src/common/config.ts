import { readFileSync } from "fs";
import { PRODUCTION_ENV } from "./constant";

interface Config {
  env: string;
  cacheByRedis: boolean;
  redisUrl: string;
}

const configStr = readFileSync(`${process.cwd()}/config.json`, "utf-8");
const jsonObj = JSON.parse(configStr);
const config: Config = {
  env: process.env.NODE_ENV || PRODUCTION_ENV,
  cacheByRedis: jsonObj.cacheByRedis || false,
  redisUrl: jsonObj.redisUrl || "redis://127.0.0.1:6379",
};

export default config;
