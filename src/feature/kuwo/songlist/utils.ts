import {
  SonglistCategory,
  SonglistDetail,
  SonglistList,
  SonglistRecommend,
  Source,
} from "@/common/typing";
import { parseSpace, str2Decimal } from "@/common/utils";
import { serializeItemList } from "../song/utils";
import {
  CategoryResponse,
  DetailResponse,
  ListResponse,
  RecommendResponse,
} from "./typing";

export const serializeDetail = async (
  res: DetailResponse
): Promise<SonglistDetail> => {
  const {
    id,
    name,
    img500: picUrl,
    listencnt: playCount,
    info: desc,
    total,
    musicList,
  } = res.data;
  return {
    id: id.toString(),
    name: parseSpace(name),
    picUrl,
    playCount,
    desc: parseSpace(desc),
    total,
    songlist: await serializeItemList(musicList),
  };
};

export const serializeCategory = (res: CategoryResponse): SonglistCategory => ({
  group: res.data.map(({ id, name, data }) => ({
    id,
    name: parseSpace(name),
    item: data.map(({ id, name }) => ({ name: parseSpace(name), id })),
  })),
});

export const serializeList = (res: ListResponse): SonglistList => {
  const { total, data } = res.data;
  return {
    total,
    list: data.map(({ id, name, img: picUrl, listencnt: playCount }) => ({
      id,
      name: parseSpace(name),
      picUrl,
      playCount: str2Decimal(playCount),
      src: Source.kw,
    })),
  };
};

export const serializeRecommend = (
  res: RecommendResponse
): SonglistRecommend => {
  const { list } = res.data;
  return list.map(({ id, name, img: picUrl, listencnt: playCount }) => ({
    id: id.toString(),
    name: parseSpace(name),
    picUrl,
    playCount,
    src: Source.kw,
  }));
};
