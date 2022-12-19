import { postMusics } from "../common";
import { DetailResponse, RecommendResponse } from "./typing";
import { searializeDetail, searializeRecommend } from "./utils";
const createDetailParam = (id: string, offset: number, num?: number) => ({
  req_1: {
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
  },
});

const createRecommendParam = () => ({
  req_1: {
    method: "GetRecommendFeed",
    module: "music.playlist.PlaylistSquare",
    param: { From: 0, Size: 25 },
  },
});

export const querySonglistDetail = (id: string, offset: number, num?: number) =>
  postMusics<ReturnType<typeof createDetailParam>, DetailResponse>(
    createDetailParam(id, offset, num)
  );

export const songlistDetail = (id: string, offset: number, num?: number) =>
  querySonglistDetail(id, offset, num).then((res) =>
    searializeDetail(res.data)
  );

export const querySonglistRecommend = () =>
  postMusics<ReturnType<typeof createRecommendParam>, RecommendResponse>(
    createRecommendParam()
  );

export const songlistRecommend = () =>
  querySonglistRecommend().then((res) => searializeRecommend(res.data));
