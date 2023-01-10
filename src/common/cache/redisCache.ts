import { createClient } from "redis";
import config from "@/common/config";
import { add } from "date-fns";
import { DEVELOPMENT_ENV } from "../constant";

const cacheByRedis = config.cacheByRedis;
const redisUrl = config.redisUrl || "redis://127.0.0.1:6379";
const errorMsg = "ServerError: cache logic error";
export const client = createClient({ url: redisUrl });

if (cacheByRedis) {
  client
    .connect()
    .catch(
      (e) =>
        config.env === DEVELOPMENT_ENV &&
        console.log(`ServerError: failed to connect to redis(${e})`)
    );
}

const get = async (key: string, path?: string) => {
  return await client.json.get(key, path ? { path: [path] } : {});
};
const set = async (key: string, path: string, val: any) => {
  try {
    await client
      .multi()
      .json.set(key, path, val)
      .expire(key, add(new Date(), { days: 1 }).valueOf() - Date.now())
      .exec();
  } catch (e) {
    config.env === DEVELOPMENT_ENV && console.log(`${errorMsg}(${e})`);
    return false;
  }
  return true;
};

const mset = async (data: [string, any][], path?: string) => {
  try {
    let temp = client.multi();
    data.forEach(([key, val]) => {
      temp = temp.json
        .set(key, path || "$", val)
        .expire(key, add(new Date(), { days: 1 }).valueOf() - Date.now());
    });
    await temp.exec();
  } catch (e) {
    config.env === DEVELOPMENT_ENV && console.log(`${errorMsg}(${e})`);
    return false;
  }
  return true;
};

const has = async (key: string, path?: string) => {
  const res = await client.json.type(key, path);
  return "null" === res;
};

const del = async (key: string, path?: string) => {
  return await client.json.del(key, path);
};

const close = () => client.disconnect();

const cache = { set, get, has, del, mset, close };
export default cache;
