import { createClient } from "redis";
import { cacheByRedis, redisUrl, password as redisPsw } from "@/common/config";
import { add } from "date-fns";
import { devLog } from "../utils";

const errorMsg = "ServerError: cache logic error";
export const client = createClient({
  url: redisUrl,
  password: redisPsw,
});

(async () => {
  if (!cacheByRedis) return;
  try {
    client.addListener("error", (err) => console.error(err));
    await client.connect();
  } catch (e) {
    devLog(`ServerError: failed to connect to redis(${e})`);
  }
})();

const convertKey = (key: string, path?: string) =>
  path === undefined ? key : `${path}-${key}`;

const get = async (key: string, path?: string) => {
  const newKey = convertKey(key, path);
  const res = await client.json.get(newKey, { path: ["$"] });
  return Array.isArray(res) ? res[0] : null;
};
const set = async (key: string, path: string, val: any) => {
  const newKey = convertKey(key, path);
  try {
    await client
      .multi()
      .json.set(newKey, "$", val)
      .expire(newKey, add(new Date(), { days: 1 }).valueOf() - Date.now())
      .exec();
  } catch (e) {
    devLog(`${errorMsg}(${e})`, (e as any).stack);
    return false;
  }
  return true;
};

const mset = async (data: [string, any][], path?: string) => {
  try {
    let temp = client.multi();
    data.forEach(([key, val]) => {
      const newKey = convertKey(key, path);
      temp = temp.json
        .set(newKey, "$", val)
        .expire(newKey, add(new Date(), { days: 1 }).valueOf() - Date.now());
    });
    await temp.exec();
  } catch (e) {
    devLog(`${errorMsg}(${e})`, (e as any).stack);
    return false;
  }
  return true;
};

const has = async (key: string, path?: string) => {
  const newKey = convertKey(key, path);
  const res = await client.json.type(newKey, "$");
  return res !== null;
};

const del = async (key: string, path?: string) => {
  const newKey = convertKey(key, path);
  return await client.json.del(newKey, "$");
};

const close = () => client.disconnect();

const cache = { set, get, has, del, mset, close };
export default cache;
