import {
  ToplistAllResponse as RawToplistAllResponse,
  ToplistDetailResponse as RawToplistDetailResponse,
} from "./typing";
import { ToplistAllResponse, ToplistDetailResponse } from "@/typing";
import moment from "moment";
const parseTimestamp = (str: string): number =>
  moment(str, "YYYY-MM-DD").valueOf();

export const serializeToplistAll = (
  data: RawToplistAllResponse
): ToplistAllResponse => {
  const groups = data.req_0.data.group;
  return {
    groups: groups.map((group) => ({
      name: group.groupName,
      id: group.groupId,
      toplists: group.toplist.map((item) => ({
        id: item.topId,
        name: item.title,
        intro: item.intro,
        updateTime: parseTimestamp(item.updateTime),
        playCount: Number(item.listenNum),
        total: Number(item.totalNum),
        picUrl: item.frontPicUrl,
      })),
    })),
  };
};

export const serializeToplistDetail = (
  data: RawToplistDetailResponse
): ToplistDetailResponse => {
  const temp = data.req_0.data;
  return {
    id: temp.data.topId,
    name: temp.data.title,
    intro: temp.data.intro,
    updateTime: parseTimestamp(temp.data.updateTime),
    playCount: temp.data.listenNum,
    total: temp.data.totalNum,
    songList: temp.songInfoList.map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      singer: item.singer.map((singer) => ({
        id: singer.id,
        name: singer.name,
        type: singer.type,
        uin: singer.uin,
      })),
      album: {
        id: item.album.id,
        name: item.album.name,
        //   title: iten;
        //   subtitle: string;
        publicTime: parseTimestamp(item.album.time_public),
      },
      mv: {
        id: item.mv.id,
        vid: item.mv.vid,
        name: item.name,
        //   title: string;
        // vt: 0;
      },
    })),
  };
};
