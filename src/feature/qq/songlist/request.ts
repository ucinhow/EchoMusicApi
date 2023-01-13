import { postMusics } from "../common";
import {
  CategoryContentResponse,
  CategoryResponse,
  DetailResponse,
  RecommendResponse,
} from "./typing";
import {
  serializeDetail,
  serializeRecommend,
  serializeCategory,
  serializeList,
} from "./utils";

const createDetailParam = (id: number, page: number, size: number) => ({
  req_1: {
    module: "music.srfDissInfo.aiDissInfo",
    method: "uniform_get_Dissinfo",
    param: {
      disstid: id,
      song_begin: (page - 1) * size,
      song_num: size,
      onlysonglist: 0,
    },
  },
});

const createRecommendParam = () => ({
  req_1: {
    method: "GetRecommendFeed",
    module: "music.playlist.PlaylistSquare",
    param: { From: 0, Size: 25 },
  },
});

const cataParam = {
  req_1: {
    method: "GetAllTag",
    module: "music.playlist.PlaylistSquare",
    param: {},
  },
};

const createListParam = (cateId: number, page: number, size: number = 20) => ({
  req_1: {
    param: { caller: "0", category_id: cateId, size, page, use_page: 1 },
    method: "get_category_content",
    module: "music.playlist.PlayListCategory",
  },
});

export const querySonglistDetail = (id: number, page: number, size: number) =>
  postMusics<ReturnType<typeof createDetailParam>, DetailResponse>(
    createDetailParam(id, page, size)
  );

export const songlistDetail = (id: number, page: number, size: number) =>
  querySonglistDetail(id, page, size).then((res) => serializeDetail(res.data));

export const querySonglistRecommend = () =>
  postMusics<ReturnType<typeof createRecommendParam>, RecommendResponse>(
    createRecommendParam()
  );

export const songlistRecommend = () =>
  querySonglistRecommend().then((res) => serializeRecommend(res.data));

export const querySonglistCategory = () =>
  postMusics<typeof cataParam, CategoryResponse>(cataParam);

export const songlistCategory = () =>
  querySonglistCategory().then((res) => serializeCategory(res.data));

export const querySonglistList = (cateId: number, page: number, size: number) =>
  postMusics<ReturnType<typeof createListParam>, CategoryContentResponse>(
    createListParam(cateId, page, size)
  );

export const songlistList = (cateId: number, page: number, size: number) =>
  querySonglistList(cateId, page, size).then((res) => serializeList(res.data));
