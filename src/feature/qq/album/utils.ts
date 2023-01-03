import { AlbumDetail } from "@/common/typing";
import { parseTimestamp } from "@/common/utils";
import { parsePicUrl } from "../common";
import { serializeSongItemList } from "../song/utils";
import { DetailResponse } from "./typing";

export const serializeDetail = (res: DetailResponse): AlbumDetail => {
  const { basicInfo, singer } = res.req_1.data;
  const songlist = res.req_2.data.songList;
  return {
    id: basicInfo.albumMid,
    name: basicInfo.albumName,
    desc: basicInfo.desc,
    picUrl: parsePicUrl(basicInfo.pmid),
    publicTime: parseTimestamp(basicInfo.publishDate),
    singer: singer.singerList.map((s) => ({ id: s.mid, name: s.name })),
    songlist: serializeSongItemList(songlist.map((s) => s.songInfo)),
  };
};
