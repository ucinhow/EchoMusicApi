import { ToplistAll, ToplistDetail, ToplistItem } from "@/common/typing";
import { ToplistMenuResponse, ToplistDetailResponse } from "./typing";
import { parse } from "date-fns";
import { parseTimestamp, str2Decimal } from "@/common/utils";
import { serializeItemList } from "../song/utils";
import { metaMap } from "./request";

const str2ms = (str: string) =>
  parse(str, "MM月dd日更新", new Date()).valueOf();

export const serializeToplistMenu = (res: ToplistMenuResponse): ToplistAll => {
  const list = res.data;
  return {
    groups: list.map((item) => ({
      name: item.name,
      toplist: item.list.map((t) => ({
        id: str2Decimal(t.sourceid),
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
  const meta = (await metaMap).get(id)!;
  return {
    id,
    name: meta.name,
    intro: meta.name,
    updateTime: parseTimestamp(data.pub),
    // playCount: 0,
    total: str2Decimal(data.num),
    songlist: await serializeItemList(data.musicList),
    picUrl: data.img,
  };
};
