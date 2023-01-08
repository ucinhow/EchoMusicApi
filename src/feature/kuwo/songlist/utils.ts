import {
  SonglistCategory,
  SonglistDetail,
  SonglistList,
  SonglistRecommend,
} from "@/common/typing";
import { str2Decimal } from "@/common/utils";
import {
  CategoryResponse,
  DetailResponse,
  ListResponse,
  RecommendResponse,
} from "./typing";

export const serializeDetail = (res: DetailResponse): SonglistDetail => {
  const {
    id,
    name,
    img500: picUrl,
    listencnt: playCount,
    info: desc,
    total,
  } = res.data;
  return {
    id: id.toString(),
    name,
    picUrl,
    playCount,
    desc,
    total,
  };
};

export const serializeCategory = (res: CategoryResponse): SonglistCategory => ({
  group: res.data.map(({ id, name, data }) => ({
    id,
    name,
    item: data.map(({ id, name }) => ({ name, id })),
  })),
});

export const serializeList = (res: ListResponse): SonglistList => {
  const { total, data } = res.data;
  return {
    total,
    list: data.map(({ id, name, img: picUrl, listencnt: playCount }) => ({
      id,
      name,
      picUrl,
      playCount: str2Decimal(playCount),
    })),
  };
};

export const serializeRecommend = (
  res: RecommendResponse
): SonglistRecommend => {
  const { list } = res.data;
  return list.map(({ id, name, img: picUrl, listencnt: playCount }) => ({
    id: id.toString(),
    name,
    picUrl,
    playCount,
  }));
};
