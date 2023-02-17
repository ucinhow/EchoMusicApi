import { baseGet } from "../common";
import {
  CategoryResponse,
  DetailResponse,
  ListResponse,
  RecommendResponse,
} from "./typing";
import {
  serializeCategory,
  serializeDetail,
  serializeList,
  serializeRecommend,
} from "./utils";

export const querySonglistDetail = (id: number, page: number, size: number) =>
  baseGet<DetailResponse>("/api/www/playlist/playListInfo", {
    params: { pid: id, pn: page, rn: size },
  });

export const songlistDetail = (id: number, page: number, size: number) =>
  querySonglistDetail(id, page, size).then((res) => serializeDetail(res.data));

export const querySonglistCat = () =>
  baseGet<CategoryResponse>("/api/www/playlist/getTagList", {});

export const songlistCategory = () =>
  querySonglistCat().then((res) => serializeCategory(res.data));

export const querySonglistList = (id: number, page: number, size: number) =>
  baseGet<ListResponse>("/api/www/classify/playlist/getTagPlayList", {
    params: { pn: page, rn: size, id },
  });

export const songlistList = (id: number, page: number, size: number) =>
  querySonglistList(id, page, size).then((res) => serializeList(res.data));

export const querySonglistRecommend = () =>
  baseGet<RecommendResponse>("/api/www/rcm/index/playlist", {
    params: { loginUid: 0 },
  });

export const songlistRecommend = () =>
  querySonglistRecommend().then((res) => serializeRecommend(res.data));
