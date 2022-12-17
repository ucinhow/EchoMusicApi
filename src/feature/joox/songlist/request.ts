import { get } from "../common";
import { DetailResponse } from "./typing";
import { searializeDetail } from "./utils";
const createDetailParam = (id: string) => ({
  id,
  country: "hk",
  lang: "zh_cn",
});
export const querySonglistDetail = (id: string) =>
  get<DetailResponse>("/page/playlistDetail", {
    params: createDetailParam(id),
  });

export const songlistDetail = (id: string) =>
  querySonglistDetail(id).then((res) => searializeDetail(res.data));
