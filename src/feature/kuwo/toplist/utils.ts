import { ToplistAll, ToplistDetail } from "@/common/typing";
import { ToplistMenuResponse, ToplistDetailResponse } from "./typing";
import { parse } from "date-fns";
import { parseSpace, parseTimestamp, str2Decimal } from "@/common/utils";
import { serializeItemList } from "../song/utils";
import { metaMap } from "./request";

const str2ms = (str: string) =>
  parse(str, "MM月dd日更新", new Date()).valueOf();

export const serializeToplistMenu = (res: ToplistMenuResponse): ToplistAll => {
  const list = res.data;
  return {
    groups: list.map((item) => ({
      name: parseSpace(item.name),
      toplist: item.list.map((t) => ({
        id: str2Decimal(t.sourceid),
        name: parseSpace(t.name),
        intro: parseSpace(t.intro),
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
    name: parseSpace(meta.name),
    intro: parseSpace(meta.name),
    updateTime: parseTimestamp(data.pub),
    // playCount: 0,
    total: str2Decimal(data.num),
    songlist: await serializeItemList(data.musicList),
    picUrl: meta.picUrl,
  };
};
