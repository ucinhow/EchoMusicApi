import { SonglistDetailResponse } from "./typing";
import { SonglistDetail } from "@/common/typing/songlist";
import { searializeSongItemList } from "../song/utils";
export const searializeDetail = (
  res: SonglistDetailResponse
): SonglistDetail => {
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
