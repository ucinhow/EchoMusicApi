import { Source } from "./common";

// import { DataType } from "./common";
export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
  singer = 4,
  // lyric = 5,
}

// Type of Search All Api

type Meta = {
  id: string;
  pic: string;
  name: string;
  singer: string;
  // publicTime: number;
};

// type ItemMeta = {

// };

type SrcMeta = {
  [K in keyof typeof Source]?: Pick<Meta, "id" | "pic">;
};
// type NameSinger = {};
export type AlbumItem = SrcMeta & Pick<Meta, "name" | "singer">;
export type SingerItem = SrcMeta & Pick<Meta, "name">;
export type SonglistItem = SrcMeta & Pick<Meta, "name">;
export type SongItem = SrcMeta & Pick<Meta, "name" | "singer">;
export type SearchData = {
  album?: Array<Meta>;
  singer?: Array<Omit<Meta, "singer">>;
  song?: Array<Omit<Meta, "pic">>;
  songlist?: Array<Omit<Meta, "singer">>;
  src: Source;
};
export interface SearchResponse {
  album?: Array<AlbumItem>;
  // mv?: {
  //   itemList: Array<Mv>;
  //   title: string;
  // };
  singer?: Array<SingerItem>;
  song?: Array<SongItem>;
  songlist?: Array<SonglistItem>;
}

// interface Mv {
//   id: string;
//   name: string;
//   singer: string;
//   vid: string;
// }

interface Singer {
  id: string;
  name: string;
  pic: string;
  //   singer: string;
}
interface Song {
  id: string;
  name: string;
  singer: Array<{ id: string; name: string }>;
}
interface Songlist {
  id: string;
  name: string;
  pic: string;
}

// export interface SearchApi {
//   (keyword: string): Promise<SearchResponse>;
// }
// Type of Search Type Api
interface AlbumType {
  id: string;
  name: string;
  pic: string;
  singer: Array<{ id: string; name: string }>;
}
export type SearchTypeResponse =
  | {
      hasMore: boolean;
      data: Array<Song>;
      type: SearchType.song;
    }
  | {
      hasMore: boolean;
      data: Array<AlbumType>;
      type: SearchType.album;
    }
  | {
      hasMore: boolean;
      data: Array<Singer>;
      type: SearchType.singer;
    }
  | {
      hasMore: boolean;
      data: Array<Songlist>;
      type: SearchType.songlist;
    };
