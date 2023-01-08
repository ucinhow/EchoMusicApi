import { get } from "../common";
import { ToplistDetailResponse, ToplistMenuResponse } from "./typing";
import { serializeToplistDetail, serializeToplistMenu } from "./utils";

export const queryToplistAll = () =>
  get<ToplistMenuResponse>("/api/www/bang/bang/bangMenu", {});

export const toplistAll = () =>
  queryToplistAll().then((res) => serializeToplistMenu(res.data));

export const queryToplistDetail = (id: number, page: number, size: number) =>
  get<ToplistDetailResponse>("/api/www/bang/bang/musicList", {
    params: {
      bangId: id,
      pn: page,
      rn: size,
    },
  });

export const toplistDetail = (id: number, page: number, size: number) =>
  queryToplistDetail(id, page, size).then((res) =>
    serializeToplistDetail(res.data, id)
  );
