import { Source } from "../typing/common";
import { SearchType, SearchTypeData, TypeData } from "../typing/search";
import cache from "./cache";

export type CacheData = {
  [K in keyof typeof Source]: {
    page: number;
    size: number;
    hasMore: boolean;
    sum: number;
  };
} & {
  data: SearchTypeData;
};

const initData = (type: SearchType): CacheData => ({
  [Source.qq]: {
    page: 0,
    size: 100,
    hasMore: true,
    sum: 0,
  },
  [Source.joox]: {
    page: 0,
    size: 30,
    hasMore: true,
    sum: 0,
  },
  data: {
    hasMore: false,
    data: [],
    type,
  },
});

const get = async (
  keyword: string,
  type: SearchType
  //   src: Source
): Promise<CacheData> => {
  const key = `SEARCHTYPE-${type}:${keyword}`;
  return (await cache.has(key)) ? await cache.get(key) : initData(type);
};

const set = async (val: CacheData, keyword: string, type: SearchType) => {
  const key = `SEARCHTYPE-${type}:${keyword}`;
  await cache.set(key, val);
};

// const cacheSearchType = async (
//   data: SearchTypeData,
//   keyword: string,
//   type: SearchType,
//   src: Source | "ALL" = "ALL"
// ) => {

// };

export default {
  get,
  set,
};
