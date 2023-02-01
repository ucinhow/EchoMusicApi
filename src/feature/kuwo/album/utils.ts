import { AlbumDetail } from "@/common/typing";
import { parseSpace, parseTimestamp } from "@/common/utils";
import { serializeItemList } from "../song/utils";
import { DetailResponse } from "./typing";

export const serializeDetail = async (
  res: DetailResponse
): Promise<AlbumDetail> => {
  const { data } = res;
  return {
    id: data.albumid.toString(),
    name: parseSpace(data.album),
    picUrl: data.pic,
    publicTime: parseTimestamp(data.releaseDate),
    desc: parseSpace(data.albuminfo),
    singer: [{ id: data.artistid.toString(), name: parseSpace(data.artist) }],
    songlist: await serializeItemList(data.musicList),
  };
};
