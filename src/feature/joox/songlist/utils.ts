import { SonglistDetail } from "@/common/typing";
import { DetailResponse } from "./typing";
import { convertImage } from "../common";
import { parseTimestamp } from "@/common/utils";
// import { serializeSongItem } from "../song/utils";
export const serializeDetail = (data: DetailResponse): SonglistDetail => {
  const temp = data.playlists;
  return {
    id: temp.id,
    name: temp.name,
    picUrl: convertImage(temp.images),
    // playCount: temp.
    desc: temp.description,
    total: temp.track_count,
    // songlist: temp.tracks.items.map(serializeSongItem),
    createTime: parseTimestamp(temp.publish_date),
  };
};
