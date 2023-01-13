import { Image } from "../common";
export enum ItemType {
  songlist = 1,
  album = 2,
  song = 5,
  // singer = 6,
  //   user = 7,
}

type Item =
  | {
      type: ItemType.album;
      album: Album;
    }
  | {
      type: ItemType.songlist;
      editor_playlist: Songlist;
    }
  | {
      type: ItemType.song;
      song: Array<{ song_info: Track }>;
    };
type Section = {
  item_list: Array<Item>;
};
type Singer = { id: string; name: string; images: Array<Image> };
export interface Track {
  album_id: string;
  id: string;
  name: string;
  album_name: string;
  artist_list: Array<{
    id: string;
    name: string;
  }>;
  play_duration: number;
  images: Array<Image>;
  vip_flag: number; // 0;
  is_playable: boolean;
  // track_free_action_control: 41;
}
interface Album {
  id: string;
  name: string;
  images: Array<Image> | null;
  publish_date: string;
  artist_list: Array<{
    id: string;
    name: string;
  }>;
}
interface Songlist {
  id: string;
  name: string;
  images: Array<Image>;
}
export interface SearchResponse {
  section_list: Array<Section>;
}

export interface SearchTypeResponse {
  has_more: boolean;
  playlists?: Array<Songlist>;
  albums?: Array<Album>;
  artists?: Array<Singer>;
  tracks?: Array<Array<Track>>;
}

export interface SearchSongResponse {
  has_more: boolean;
  tracks: Array<Array<Track>>;
  error_code: number;
}
