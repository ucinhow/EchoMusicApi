import { createClient } from "redis";
import moment from "moment";

export const client = createClient();
// todo: The logic of caching data using map data structures is not completed.

let cacheByRedis = false;

client
  .connect()
  .then(() => {
    cacheByRedis = true;
  })
  .catch((e) => {
    console.log(
      `Failed to connect to Redis, will cache data with JavaScript Map: ${e}`
    );
  });
// try {
//   await client.connect();
// } catch (e) {
//   console.log(e);
//   cacheByRedis = false;
// }
const map = new Map<string, any>();
const get = async (key: string, path?: string) => {
  if (cacheByRedis) {
    return await client.json.get(key, path ? { path: [path] } : {});
  } else {
    return map.get(key);
  }
};
const set = async (key: string, path: string, val: any) => {
  try {
    if (cacheByRedis) {
      await client
        .multi()
        .json.set(key, path, val)
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

const mset = async (path: string, data: [string, any][]) => {
  try {
    // for (const item of data) {
    //   const [key, val] = item;
    if (cacheByRedis) {
      let temp = client.multi();
      data.forEach(([key, val]) => {
        temp = temp.json
          .set(key, path, val)
          .expire(
            key,
            moment().add(1, "days").hours(0).minutes(0).seconds(0).unix() -
              moment().unix()
          );
      });
      await temp.exec();
    } else {
      data.forEach(([key, val]) => {
        map.set(key, val);
        setTimeout(
          () => map.delete(key),
          moment().add(1, "days").hours(0).minutes(0).seconds(0).valueOf() -
            moment().valueOf()
        );
      });
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

const has = async (key: string, path?: string) => {
  if (cacheByRedis) {
    const res = await client.json.type(key, path);
    console.log("client.json.type console.log output: ", res);
    return "null" === res;
  } else {
    return map.has(key);
  }
};

const del = async (key: string, path?: string) => {
  if (cacheByRedis) {
    return await client.json.del(key, path);
  } else {
    return map.delete(key);
  }
};

// const setSongItem = async (key: string, data: SongItem) => {
//   // const key = calcSongItemKey(data);
//   const temp = `SONGITEM-${key}`;
//   return await set(temp, data);
// };

// const setSongItems = async (data: SongItem[]) => {
//   let temp = client.multi();
//   for (const item of data) {
//     const key = `SONGITEM-${calcSongItemKey(item)}`;
//     temp = temp.json.set(key, "$", item);
//   }
//   await temp.exec();
// };

// const hasSongItem = async (key: string) => {
//   const temp = `SONGITEM-${key}`;
//   return await has(temp);
// };

// const getSongItem = async (key: string) => {
//   const temp = `SONGITEM-${key}`;
//   return await get(temp);
// };
// export const cacheSongItem = {
//   mset: setSongItems,
//   has: hasSongItem,
//   get: getSongItem,
// };
const cache = { set, get, has, del, mset };
export default cache;
