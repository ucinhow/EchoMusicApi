import { postMusics } from "../common";
import { DetailResponse } from "./typing";
import { serializeDetail } from "./utils";

const createDetailParam = (id: string) => ({
  req_1: {
    module: "music.musichallAlbum.AlbumInfoServer",
    method: "GetAlbumDetail",
    param: { albumMid: id, albumID: 0 },
  },
  req_2: {
    module: "music.musichallAlbum.AlbumSongList",
    method: "GetAlbumSongList",
    param: {
      albumMid: id,
      albumID: 0,
      begin: 0,
      num: 100,
      //   order: 2,
    },
  },
});

export const queryAlbumDetail = (id: string) =>
  postMusics<ReturnType<typeof createDetailParam>, DetailResponse>(
    createDetailParam(id)
  );

export const albumDetail = (id: string) =>
  queryAlbumDetail(id).then((res) => serializeDetail(res.data));
