import { ToplistAllResponse, ToplistDetailResponse } from "./typing";
import { ToplistAll, ToplistDetail } from "@/common/typing/toplist";
import { parseTimestamp } from "@/common/utils";
import { serializeSongItemList } from "../song/utils";
export const serializeToplistAll = (data: ToplistAllResponse): ToplistAll => {
  const groups = data.req_0.data.group;
  return {
    groups: groups.map((group) => ({
      name: group.groupName,
      toplist: group.toplist.map((item) => ({
        id: item.topId,
        name: item.title,
        intro: item.intro,
        updateTime: parseTimestamp(item.updateTime),
        picUrl: item.frontPicUrl,
      })),
    })),
  };
};

export const serializeToplistDetail = (
  data: ToplistDetailResponse
): ToplistDetail => {
  const {
    topId: id,
    title: name,
    intro,
    updateTime,
    // listenNum: playCount,
    totalNum: total,
    frontPicUrl: picUrl,
  } = data.req_1.data.data;
  return {
    id,
    name,
    intro,
    updateTime: parseTimestamp(updateTime),
    // playCount,
    total,
    songlist: serializeSongItemList(data.req_1.data.songInfoList),
    picUrl,
  };
};
