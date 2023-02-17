import { baseGet } from "../common";
import { ToplistDetailResponse, ToplistMenuResponse } from "./typing";
import { serializeToplistDetail, serializeToplistMenu } from "./utils";
import { ToplistItem } from "@/common/typing";

export const queryToplistAll = () =>
  baseGet<ToplistMenuResponse>("/api/www/bang/bang/bangMenu", {});

export const toplistAll = () =>
  queryToplistAll().then((res) => {
    return serializeToplistMenu(res.data);
  });

export const queryToplistDetail = (id: number, page: number, size: number) =>
  baseGet<ToplistDetailResponse>("/api/www/bang/bang/musicList", {
    params: {
      bangId: id,
      pn: page,
      rn: size,
    },
  });

export const toplistDetail = (id: number, page: number, size: number) =>
  queryToplistDetail(id, page, size).then((res) => {
    return serializeToplistDetail(res.data, id);
  });

export const metaMap = new Promise<Map<number, ToplistItem>>((resolve) => {
  setTimeout(() => {
    toplistAll().then(({ groups }) => {
      const map = new Map<number, ToplistItem>();
      for (const { toplist } of groups) {
        toplist.forEach((t) => map.set(t.id, t));
      }
      resolve(map);
    });
  }, 500);
});
