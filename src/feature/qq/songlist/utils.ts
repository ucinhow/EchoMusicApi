import { DetailResponse, RecommendResponse } from "./typing";
import { SonglistDetail, SonglistRecommend } from "@/common/typing";
import { searializeSongItemList } from "../song/utils";
export const searializeDetail = (res: DetailResponse): SonglistDetail => {
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
    songlist: searializeSongItemList(data.songlist || []),
  };
};

export const searializeRecommend = (
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
