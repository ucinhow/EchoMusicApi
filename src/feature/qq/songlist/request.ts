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
  serializeItems,
  serializeList,
} from "./utils";

const createDetailParam = (id: number) => ({
  req_1: {
    module: "music.srfDissInfo.aiDissInfo",
    method: "uniform_get_Dissinfo",
    param: {
      disstid: id,
      // userinfo: 1,
      // tag: 1,
      // orderlist: 1,
      song_begin: 0,
      song_num: 10,
      onlysonglist: 0,
      // enc_host_uin: "",
    },
  },
});
const createItemParam = (id: number, offset: number, num?: number) => ({
  req_1: {
    module: "music.srfDissInfo.aiDissInfo",
    method: "uniform_get_Dissinfo",
    param: {
      disstid: id,
      // userinfo: 1,
      // tag: 1,
      // orderlist: 1,
      song_begin: offset,
      song_num: num,
      onlysonglist: 1,
      // enc_host_uin: "",
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

export const querySonglistDetail = (id: number) =>
  postMusics<ReturnType<typeof createDetailParam>, DetailResponse>(
    createDetailParam(id)
  );

export const songlistDetail = (id: string) =>
  querySonglistDetail(Number(id)).then((res) => serializeDetail(res.data));

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

export const querySonglistItems = (id: number, offset: number, num?: number) =>
  postMusics<ReturnType<typeof createItemParam>, DetailResponse>(
    createItemParam(id, offset, num)
  );

export const songlistItems = (id: string, offset: number, num?: number) =>
  querySonglistItems(Number(id), offset, num).then((res) =>
    serializeItems(res.data)
  );
