import config from "@/config";
import MapCache from "./mapCache";
import redisCache from "./redisCache";

const cacheByRedis = config.cacheByRedis;

const cache = cacheByRedis ? redisCache : MapCache.getInstance();
export default cache;

export * from "./fns";
