// import { Source } from "./common";
// import { SongItem } from "./song";
import { SrcMeta } from "./common";
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

// Type of Search Suggestion Api

type SSSrcMeta = SrcMeta<{
  id: string;
  picUrl: string;
}>;

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

// export type AlbumItem = SrcInfo & Pick<Field, "name" | "singer">;
// export type SingerItem = SrcInfo & Pick<Field, "name">;
// export type SonglistItem = SrcInfo & Pick<Field, "name">;
// export type SongItem = SrcInfo & Pick<Field, "name" | "singer">;
// export type SearchData = {
//   album?: Array<Field>;
//   singer?: Array<Omit<Field, "singer">>;
//   song?: Array<Omit<Field, "pic">>;
//   songlist?: Array<Omit<Field, "singer">>;
//   src: Source;
// };
// export interface SearchResponse {
//   album?: Array<AlbumItem>;
//   // mv?: {
//   //   itemList: Array<Mv>;
//   //   title: string;
//   // };
//   singer?: Array<SingerItem>;
//   song?: Array<SongItem>;
//   songlist?: Array<SonglistItem>;
// }

// Type of Search Type Api

// type TypeField = {
//   id: string;
//   singerId: Array<string>;
//   albumId: string;
//   pic: string;
//   singer: Array<{ id: string; name: string }>;
//   singerName: Array<string>;
//   albumName: string;
//   duration: number;
//   name: string;
//   publicTime: number;
//   songCount: number;
//   // src: Source;
// };
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

// export type Singer = Pick<TypeField, "name"> &
//   SrcMeta<Pick<TypeField, "id" | "pic">>;

// export type Album = Pick<TypeField, "name" | "publicTime" | "singerName"> &
//   SrcMeta<Pick<TypeField, "id" | "singerId">>;

// export type Songlist = {
//   id: string;
//   name: string;
//   picUrl: string;
// };

export interface SongTypeData {
  hasMore: boolean;
  data: Array<SongItem>;
  type: SearchType.song;
}
export interface SearchSong {
  hasMore: boolean;
  data: Array<SongItem>;
  nextPage: number;
}
export interface AlbumTypeData {
  hasMore: boolean;
  data: Array<AlbumItem>;
  type: SearchType.album;
}
export interface SearchAlbum {
  hasMore: boolean;
  data: Array<AlbumItem>;
  nextPage: number;
}
export interface SonglistTypeData {
  hasMore: boolean;
  data: Array<SonglistItem>;
  type: SearchType.songlist;
}
export interface SearchSonglist {
  hasMore: boolean;
  data: Array<SonglistItem>;
  nextPage: number;
}
// export type TypeData =
//   |
//   | {  }
//   // | { data: Array<Singer>; type: SearchType.singer }
//   | {  };

export type SearchTypeData = SongTypeData | AlbumTypeData | SonglistTypeData;
export type SearchTypeResponse = SearchTypeData;
export interface SearchTypeApi {
  (key: string, page: number, type: SearchType): Promise<SearchTypeData>;
}
export interface SuggestSearchApi {
  (key: string): Promise<SuggestSearch>;
}
