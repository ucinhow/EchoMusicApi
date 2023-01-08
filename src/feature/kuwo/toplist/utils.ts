import { ToplistAll, ToplistDetail } from "@/common/typing";
import { ToplistMenuResponse, ToplistDetailResponse } from "./typing";
import { parse } from "date-fns";
import { parseTimestamp } from "@/common/utils";
import { serializeMusicItem } from "../song/utils";

const str2ms = (str: string) =>
  parse(str, "MM月dd日更新", new Date()).valueOf();

export const serializeToplistMenu = (res: ToplistMenuResponse): ToplistAll => {
  const list = res.data;
  return {
    groups: list.map((item) => ({
      name: item.name,
      toplist: item.list.map((t) => ({
        id: parseInt(t.id),
        name: t.name,
        intro: t.intro,
        updateTime: str2ms(t.pub),
        picUrl: t.pic,
      })),
    })),
  };
};

export const serializeToplistDetail = async (
  res: ToplistDetailResponse,
  id: number
): Promise<ToplistDetail> => {
  const { data } = res;
  return {
    id,
    name: "",
    intro: "",
    updateTime: parseTimestamp(data.pub),
    playCount: 0,
    total: parseInt(data.num, 10),
    songlist: await Promise.all(data.musicList.map(serializeMusicItem)),
  };
};
