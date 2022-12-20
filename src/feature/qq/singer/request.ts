import { postMusics, commParams } from "../common";
// import { searializeDetail } from "../songlist/utils";
import { SingerDetailResponse, SingerListResponse } from "./typing";
import { serializeSingerList, serializeDetail } from "./utils";
const allSingerParams = {
  req_0: {
    module: "music.musichallSinger.SingerList",
    method: "GetSingerListIndex",
    param: {
      area: -100,
      sex: -100,
      index: -100,
      genre: -100,
      cur_page: 1,
      sin: 0,
    },
  },
  comm: commParams,
};

const createDetailParam = (id: string) => ({
  req_1: {
    method: "GetSingerDetail",
    param: {
      singer_mids: [id],
      ex_singer: 1,
      wiki_singer: 1,
      group_singer: 0,
      pic: 1,
      photos: 0,
    },
    module: "music.musichallSinger.SingerInfoInter",
  },
  req_2: {
    method: "GetAlbumList",
    param: {
      singerMid: id,
      order: 0,
      begin: 0,
      num: 1,
      songNumTag: 0,
      singerID: 0,
    },
    module: "music.musichallAlbum.AlbumListServer",
  },
  req_3: {
    method: "GetSingerSongList",
    param: { singerMid: id, order: 1, begin: 0, num: 1 },
    module: "musichall.song_list_server",
  },
  req_4: {
    method: "cgi_qry_concern_num",
    module: "Concern.ConcernSystemServer",
    param: { vec_userinfo: [{ userid: id }] },
  },
});

export const querySingerList = () =>
  postMusics<typeof allSingerParams, SingerListResponse>(allSingerParams).then(
    (res) => serializeSingerList(res.data)
  );

export const querySingerDetail = (id: string) =>
  postMusics<ReturnType<typeof createDetailParam>, SingerDetailResponse>(
    createDetailParam(id)
  );

export const singerDetail = (id: string) =>
  querySingerDetail(id).then((res) => serializeDetail(res.data));
