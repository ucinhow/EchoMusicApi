import { Image } from "../common";
import { TrackItem } from "../song/typing";
interface SonglistDetail {
  description: string;
  id: string;
  images: Array<Image>;
  name: string;
  publish_date: string; // "2022-12-06";
  track_count: number;
  tracks: {
    items: Array<TrackItem>;
  };
}

export interface DetailResponse {
  playlists: SonglistDetail;
}
