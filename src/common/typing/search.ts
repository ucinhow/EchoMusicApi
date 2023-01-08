import { SearchSuggestSource, SrcMeta } from "./common";
import { SongItem } from "./song";
import { SonglistItem } from "./songlist";
import { AlbumItem } from "./album";

export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
  // singer = 4, // todo: deduplicate singer info.
  // lyric = 5,
}

type SSSrcMeta = {
  [k in keyof typeof SearchSuggestSource]: {
    id: string;
    picUrl: string;
  };
};

export interface SSData {
  album: SSSrcMeta & {
    name: string;
    singer: string;
  };
  singer: SSSrcMeta & {
    name: string;
  };
  songlist: SSSrcMeta & {
    name: string;
  };
  song: SrcMeta<{ id: string }> & {
    name: string;
    singer: string;
  };
}

export interface SuggestSearch {
  album?: Array<SSData["album"]>;
  singer?: Array<SSData["singer"]>;
  songlist?: Array<SSData["songlist"]>;
  song?: Array<SSData["song"]>;
}

export interface SearchSong {
  hasMore: boolean;
  data: Array<SongItem>;
  nextPage: number;
}

export interface SearchAlbum {
  hasMore: boolean;
  data: Array<AlbumItem>;
  nextPage: number;
}

export interface SearchSonglist {
  hasMore: boolean;
  data: Array<SonglistItem>;
  nextPage: number;
}

export interface SearchTypeResponse {
  hasMore: boolean;
  data: Array<SongItem | AlbumItem | SonglistItem>;
  type: SearchType;
}

export interface SuggestSearchApi {
  (key: string): Promise<SuggestSearch>;
}
