import { AlbumDetail } from "@/common/typing";
import { parseTimestamp } from "@/common/utils";
import { serializeItemList, serializeMusicItem } from "../song/utils";
import { DetailResponse } from "./typing";

export const serializeDetail = async (
  res: DetailResponse
): Promise<AlbumDetail> => {
  const { data } = res;
  return {
    id: data.albumid.toString(),
    name: data.album,
    picUrl: data.pic,
    publicTime: parseTimestamp(data.releaseDate),
    desc: data.albuminfo,
    singer: [{ id: data.artistid.toString(), name: data.artist }],
    songlist: await serializeItemList(data.musicList),
  };
};
