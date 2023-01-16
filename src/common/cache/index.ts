import { cacheByRedis } from "@/common/config";
import MapCache from "./mapCache";
import redisCache from "./redisCache";

const cache = cacheByRedis ? redisCache : MapCache.getInstance();
export default cache;

export * from "./fns";
