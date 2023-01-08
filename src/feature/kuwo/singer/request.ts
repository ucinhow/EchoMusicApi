import { get } from "../common";
import { DetailResponse } from "./typing";
import { serializeDetail } from "./utils";

export const querySingerDetail = (id: number) =>
  get<DetailResponse>("/api/www/artist/artist", { params: { artistid: id } });

export const singerDetail = (id: number) =>
  querySingerDetail(id).then((res) => serializeDetail(res.data));
