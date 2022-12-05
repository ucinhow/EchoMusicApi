import redis from "redis";
import moment from "moment";
const client = redis.createClient();
// client.on("error", (err) => {
//   console.log(err);
// });
let cacheByRedis = true;

try {
  await client.connect();
} catch (e) {
  console.log(e);
  cacheByRedis = false;
}
const map = new Map<string, any>();
const get = async (key: string, path?: string[]) => {
  if (cacheByRedis) {
    return await client.json.get(
      key,
      path ? { path: [`$.${path.join(".")}`] } : {}
    );
  } else {
    return map.get(key);
  }
};
const set = async (key: string, val: any) => {
  try {
    if (cacheByRedis) {
      await client
        .multi()
        .json.set(key, "$", val)
        .expire(
          key,
          moment().add(1, "days").hours(0).minutes(0).seconds(0).unix() -
            moment().unix()
        )
        .exec();
    } else {
      map.set(key, val);
      setTimeout(
        () => map.delete(key),
        moment().add(1, "days").hours(0).minutes(0).seconds(0).valueOf() -
          moment().valueOf()
      );
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

const has = async (key: string) => {
  if (cacheByRedis) {
    return await client.exists(key);
  } else {
    return map.has(key);
  }
};

const del = async (key: string) => {
  if (cacheByRedis) {
    await client.del(key);
  } else {
    map.delete(key);
  }
};

const cache = { set, get, has, del };
export default cache;
