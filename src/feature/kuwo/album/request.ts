import { baseGet } from "../common";
import { DetailResponse } from "./typing";
import { serializeDetail } from "./utils";

export const queryAlbumDetail = (id: number, page: number, size: number) =>
  baseGet<DetailResponse>("/api/www/album/albumInfo", {
    params: {
      albumId: id,
      pn: page,
      rn: size,
    },
  });

export const albumDetail = (id: number, page: number, size: number) =>
  queryAlbumDetail(id, page, size).then((res) => serializeDetail(res.data));
