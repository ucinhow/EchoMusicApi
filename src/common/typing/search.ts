import { Source } from "./common";

export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
  // singer = 4, // todo: deduplicate singer info.
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
  // src: Source;
};
// export type RawSong = Pick<
//   TypeField,
//   "id" | "name" | "singer" | "albumId" | "albumName" | "duration"
// >;
// export type RawAlbum = Pick<TypeField, "id" | "name" | "singer" | "publicTime">;
// export type RawSinger = Pick<TypeField, "name" | "id" | "pic">;
// export type RawSonglist = Pick<TypeField, "id" | "name" | "pic">;
// type TypeRawData =
//   | {
//       data: Array<RawSong>;
//       type: SearchType.song;
//     }
//   | {
//       data: Array<RawAlbum>;
//       type: SearchType.album;
//     }
//   | {
//       data: Array<RawSinger>;
//       type: SearchType.singer;
//     }
//   | {
//       data: Array<RawSonglist>;
//       type: SearchType.songlist;
//     };

// export type SearchTypeData = {
//   hasMore: boolean;
//   src: Source;
//   page: number;
//   sum: number;
// } & TypeRawData;

type SrcMeta<T> = {
  [K in keyof typeof Source]?: T;
};
export type Singer = Pick<TypeField, "name"> &
  SrcMeta<Pick<TypeField, "id" | "pic">>;

export type Song = Pick<
  TypeField,
  "name" | "singerName" | "albumName" | "duration"
> &
  SrcMeta<Pick<TypeField, "id" | "singerId" | "albumId">>;

export type Album = Pick<TypeField, "name" | "publicTime" | "singerName"> &
  SrcMeta<Pick<TypeField, "id" | "singerId">>;

export type Songlist = Pick<TypeField, "id" | "name" | "pic">;

export type TypeData =
  | { data: Array<Song>; type: SearchType.song }
  | { data: Array<Album>; type: SearchType.album }
  // | { data: Array<Singer>; type: SearchType.singer }
  | { data: Array<Songlist>; type: SearchType.songlist };

export type SearchTypeData = {
  hasMore: boolean;
  // sum?: number;
  // src: Source;
  // page?: number;
} & TypeData;
