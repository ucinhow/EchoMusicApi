import { Source } from "./common";

export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
  singer = 4,
  // lyric = 5,
}

// Type of Search All Api

type Field = {
  id: string;
  pic: string;
  name: string;
  singer: string;
};

type SrcInfo = {
  [K in keyof typeof Source]?: Pick<Field, "id" | "pic">;
};

// interface Mv {
//   id: string;
//   name: string;
//   singer: string;
//   vid: string;
// }
export type AlbumItem = SrcInfo & Pick<Field, "name" | "singer">;
export type SingerItem = SrcInfo & Pick<Field, "name">;
export type SonglistItem = SrcInfo & Pick<Field, "name">;
export type SongItem = SrcInfo & Pick<Field, "name" | "singer">;
export type SearchData = {
  album?: Array<Field>;
  singer?: Array<Omit<Field, "singer">>;
  song?: Array<Omit<Field, "pic">>;
  songlist?: Array<Omit<Field, "singer">>;
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

// Type of Search Type Api

type TypeField = {
  id: string;
  singerId: Array<string>;
  albumId: string;
  pic: string;
  singer: Array<{ id: string; name: string }>;
  singerName: Array<string>;
  albumName: string;
  duration: number;
  name: string;
  publicTime: number;
  songCount: number;
  src: Source;
};

type SrcMeta<T> = {
  [K in keyof typeof Source]: T;
};
type Singer = Pick<TypeField, "name"> & SrcMeta<Pick<TypeField, "id" | "pic">>;

type Song = Pick<TypeField, "name" | "singerName" | "albumName" | "duration"> &
  SrcMeta<Pick<TypeField, "id" | "singerId" | "albumId">>;

type Album = Pick<TypeField, "name" | "publicTime" | "singerName"> &
  SrcMeta<Pick<TypeField, "id" | "singerId">>;

type Songlist = Pick<TypeField, "id" | "name" | "pic" | "src">;

export type SearchTypeData =
  | {
      hasMore: boolean;
      data: Array<
        Pick<
          TypeField,
          "id" | "name" | "singer" | "albumId" | "albumName" | "duration"
        >
      >;
      type: SearchType.song;
    }
  | {
      hasMore: boolean;
      data: Array<Pick<TypeField, "id" | "name" | "singer" | "publicTime">>;
      type: SearchType.album;
    }
  | {
      hasMore: boolean;
      data: Array<Pick<TypeField, "name" | "id" | "pic">>;
      type: SearchType.singer;
    }
  | {
      hasMore: boolean;
      data: Array<Pick<TypeField, "id" | "name" | "pic" | "src">>;
      type: SearchType.songlist;
    };

export type SearchTypeResponse =
  | {
      hasMore: boolean;
      data: Array<Song>;
      type: SearchType.song;
    }
  | {
      hasMore: boolean;
      data: Array<Album>;
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
