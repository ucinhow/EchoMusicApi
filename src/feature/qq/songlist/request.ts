import { postMusics } from "../common";
import { SonglistDetailResponse } from "./typing";
import { searializeDetail } from "./utils";
const createDetailParam = (id: string, offset: number, num?: number) => ({
  module: "music.srfDissInfo.aiDissInfo",
  method: "uniform_get_Dissinfo",
  param: {
    disstid: id,
    // userinfo: 1,
    // tag: 1,
    // orderlist: 1,
    song_begin: offset,
    song_num: num,
    onlysonglist: 0,
    // enc_host_uin: "",
  },
});

export const querySonglistDetail = (id: string, offset: number, num?: number) =>
  postMusics<ReturnType<typeof createDetailParam>, SonglistDetailResponse>(
    createDetailParam(id, offset, num)
  );

export const songlistDetail = (id: string, offset: number, num?: number) =>
  querySonglistDetail(id, offset, num).then((res) =>
    searializeDetail(res.data)
  );
