import { SonglistDetail } from "@/common/typing";
import { DetailResponse } from "./typing";
import { convertImage } from "../common";
import { parseTimestamp } from "@/common/utils";
import { searializeSongItem } from "../song/utils";
export const searializeDetail = (data: DetailResponse): SonglistDetail => {
  const temp = data.playlists;
  return {
    id: temp.id,
    name: temp.name,
    picUrl: convertImage(temp.images),
    // playCount: temp.
    desc: temp.description,
    total: temp.track_count,
    songlist: temp.tracks.items.map(searializeSongItem),
    createTime: parseTimestamp(temp.publish_date),
  };
};
