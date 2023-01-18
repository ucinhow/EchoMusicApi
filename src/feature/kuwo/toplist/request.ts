import { createCommInstance } from "../common";
import { ToplistDetailResponse, ToplistMenuResponse } from "./typing";
import { serializeToplistDetail, serializeToplistMenu } from "./utils";
import { ToplistItem } from "@/common/typing";

const instance = createCommInstance("/rankList");

export const queryToplistAll = () =>
  instance.get<ToplistMenuResponse>("/api/www/bang/bang/bangMenu", {});

export const toplistAll = () =>
  queryToplistAll().then((res) => serializeToplistMenu(res.data));

export const queryToplistDetail = (id: number, page: number, size: number) =>
  instance.get<ToplistDetailResponse>("/api/www/bang/bang/musicList", {
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

export const metaMap = new Promise<Map<number, ToplistItem>>((resolve) => {
  const map = new Map<number, ToplistItem>();
  setTimeout(() => {
    toplistAll().then(({ groups }) => {
      for (const { toplist } of groups) {
        toplist.forEach((t) => map.set(t.id, t));
      }
    });
    resolve(map);
  }, 1000);
});
