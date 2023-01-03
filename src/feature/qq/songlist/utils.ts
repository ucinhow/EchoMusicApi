import {
  CategoryContentResponse,
  CategoryResponse,
  DetailResponse,
  RecommendResponse,
} from "./typing";
import {
  SongItem,
  SonglistCategory,
  SonglistDetail,
  SonglistList,
  SonglistRecommend,
} from "@/common/typing";
import { serializeSongItemList } from "../song/utils";
export const serializeDetail = (res: DetailResponse): SonglistDetail => {
  const { data } = res.req_1;
  const { dirinfo } = data;
  return {
    id: dirinfo.id.toString(),
    name: dirinfo.title,
    picUrl: dirinfo.picurl,
    playCount: dirinfo.listennum,
    desc: dirinfo.desc,
    total: dirinfo.songnum,
    createTime: dirinfo.ctime * 1000,
    // songlist: serializeSongItemList(data.songlist || []),
  };
};

export const serializeRecommend = (
  res: RecommendResponse
): SonglistRecommend => {
  const data = res.req_1.data.List;
  return data.map((item) => {
    const temp = item.Playlist.basic;
    return {
      id: temp.dirid.toString(),
      name: temp.title,
      picUrl: temp.cover.default_url,
      playCount: temp.play_cnt,
    };
  });
};

export const serializeCategory = (res: CategoryResponse): SonglistCategory => {
  const data = res.req_1.data.v_group;
  return {
    group: data.map((item) => ({
      id: item.group_id,
      name: item.group_name,
      item: item.v_item.map((i) => ({ name: i.name, id: i.id })),
    })),
  };
};

export const serializeList = (res: CategoryContentResponse): SonglistList => {
  const data = res.req_1.data.content;
  return {
    totalCnt: data.total_cnt,
    list: data.v_item.map((i) => ({
      name: i.basic.title,
      id: i.basic.dirid.toString(),
      playCount: i.basic.play_cnt,
      picUrl: i.basic.cover.default_url,
    })),
  };
};

export const serializeItems = (res: DetailResponse): SongItem[] => {
  const data = res.req_1.data.songlist;
  return serializeSongItemList(data);
};
