import { get } from "../common";
import { ToplistDetailResponse, ToplistMenuResponse } from "./typing";
import { serializeToplistDetail, serializeToplistMenu } from "./utils";

export const queryToplistAll = () =>
  get<ToplistMenuResponse>("/api/www/bang/bang/bangMenu", {});

export const toplistAll = () =>
  queryToplistAll().then((res) => serializeToplistMenu(res.data));

export const queryToplistDetail = (id: number) =>
  get<ToplistDetailResponse>("/api/www/bang/bang/musicList", {
    params: {
      bangId: id,
      pn: 1,
      rn: 30,
    },
  });

export const toplistDetail = (id: number) =>
  queryToplistDetail(id).then((res) => serializeToplistDetail(res.data, id));
